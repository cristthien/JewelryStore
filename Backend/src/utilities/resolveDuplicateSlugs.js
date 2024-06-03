const Accessory = require("../models/accessoryModel.js"); // Replace with your model path

async function resolveDuplicateSlugs(duplicates) {
  for (const duplicate of duplicates) {
    const slug = duplicate._id;
    let count = duplicate.count;

    try {
      const productsToUpdate = await Accessory.find({ slug }); // Find products with the duplicate slug

      for (const product of productsToUpdate) {
        let newSlug = `${product.slug}-${count}`;
        count--; // Generate new unique slug
        product.slug = newSlug;
        await product.save(); // Save product with the new, unique slug
      }
    } catch (error) {
      console.error("Error resolving duplicate slugs:", error);
    }
  }
}

module.exports = resolveDuplicateSlugs;
