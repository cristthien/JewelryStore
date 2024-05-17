const ProductLock = require("../models/productLock.js");
const reloadStock = require("./reloadStock.js");
class lockingFunctions {
  async acquireLocks(productsToUpdate, session) {
    const MAX_RETRIES = 5; // Maximum number of retries
    const RETRY_INTERVAL_MS = 1000; // Retry interval in milliseconds
    for (let i = 0; i < productsToUpdate.length; i++) {
      let retries = 0;
      let acquiredLock = false;
      let updatedProduct;

      const product = productsToUpdate[i];
      const idProduct = product._id;
      while (retries < MAX_RETRIES && !acquiredLock) {
        try {
          // Attempt to acquire the lock
          await ProductLock.findOneAndUpdate(
            { product: idProduct, locked: false },
            { $set: { product: idProduct, locked: true } },
            { upsert: true, session }
          );

          // Reload product data after acquiring the lock
          updatedProduct = await reloadStock(product._id);
          if (!updatedProduct) {
            throw new Error(`Product with ID ${product._id} not found`);
          }

          acquiredLock = true; // Set acquiredLock flag to true
        } catch (error) {
          console.log(error.message);
          // Lock acquisition failed, wait and retry
          console.log(
            `Lock acquisition failed for product ${product._id}, retrying...`
          );
          await new Promise((resolve) =>
            setTimeout(resolve, RETRY_INTERVAL_MS)
          );
          retries++;
        }
      }

      if (!acquiredLock) {
        throw new Error(`Failed to acquire lock for product ${product._id}`);
      }

      // Update the original object in the productsToUpdate array
      productsToUpdate[i] = updatedProduct;
    }
    return productsToUpdate;
  }
  async releaseLocks(products) {
    for (const product of products) {
      await ProductLock.findOneAndUpdate(
        { product: product._id },
        { $set: { locked: false } }
      );
    }
  }
}

module.exports = new lockingFunctions();
