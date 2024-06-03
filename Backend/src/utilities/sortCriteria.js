module.exports = (req) => {
  if (req.query.sort) {
    let sortCriteria = {};
    const sortValue = req.query.sort.toLowerCase(); // Handle case-insensitive sorting

    if (sortValue === "asc") {
      sortCriteria = { price: 1 }; // Sort by price ascending
    } else if (sortValue === "desc") {
      sortCriteria = { price: -1 }; // Sort by price descending
    } else {
      console.warn("Invalid sort value:", sortValue); // Log invalid sort value (optional)
    }
  }
  return sortCriteria;
};
