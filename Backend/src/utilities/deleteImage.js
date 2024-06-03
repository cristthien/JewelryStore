const fs = require("fs");
function deleteImage(images) {
  images.forEach((image) => {
    const filePath = convertUrlToLocalPath(image);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error("File does not exist or cannot be accessed");
      }

      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
        console.log("File deleted successfully");
      });
    });
  });
}

function convertUrlToLocalPath(url) {
  // Split the URL by '/'
  const parts = url.split("/");

  // Extract the file name from the URL
  const fileName = parts[parts.length - 1];

  // Define the base directory where your files are stored
  const baseDirectory = "C:\\Users\\thien\\Documents\\JewelryStore\\public";

  // Join the base directory with the file name to get the local file path
  const localPath = `${baseDirectory}${url.replace("/img", "")}`;

  return localPath;
}

module.exports = deleteImage;
