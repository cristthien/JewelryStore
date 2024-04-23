const Accessory = require("../models/accessoryModel.js"); // Replace with your model path

async function findDuplicateSlugs() {
  const duplicates = await Accessory.aggregate([
    { $group: { _id: "$slug", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }, // Filter for groups with count > 1 (duplicates)
  ]);
  return duplicates; // Array of objects with { _id: "duplicate-slug", count: number }
}
module.exports = findDuplicateSlugs;
