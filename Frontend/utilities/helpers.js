const Handlebars = require("express-handlebars");

module.exports = {
  eq(a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  },
  contains(array, value, options) {
    if (array && array.includes(value)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },
  concate(url, endpoint) {
    return url + endpoint;
  },
  indexer: (array, index) => {
    if (Array.isArray(array) && typeof index === "number") {
      return array[index];
    }
    return null;
  },
  formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  },
  chunk: function (array, size) {
    let result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  },
};
