function takeMaterialJewelry(text) {
  let firstSentence = text.split(". ", 1)[0];
  let materials = firstSentence.split(", ").slice(1);

  return extractJewelryKeywords(materials);
}

function extractJewelryKeywords(descriptions) {
  // Define more specific keywords to look for
  const keywords = [
    "rose gold",
    "yellow gold",
    "white gold",
    "gold",
    "diamond",
    "silver",
    "platinum",
    "pearl",
    "ruby",
    "sapphire",
    "emerald",
    "steel",
    "leather",
    "ceramic",
    "garnet",
    "onyx",
    "mechanic",
    "22.2 mm",
    "24 mm",
    "26 mm",
    "28 mm",
    "30 mm",
    "32 mm",
    "33 mm",
    "34 mm",
    "36 mm",
    "38 mm",
    "40 mm",
    "42 mm",
    "44 mm",
    "46 mm",
    "48 mm",
  ];
  // Function to check if a string contains any of the keywords
  function containsKeyword(description) {
    for (let keyword of keywords) {
      if (description.toLowerCase().includes(keyword)) {
        return keyword;
      }
    }
    return null;
  }

  // Extract keywords from the descriptions
  let extractedKeywords = descriptions
    .map(containsKeyword)
    .filter((keyword) => keyword !== null);

  return extractedKeywords.join(", ");
}
module.exports = takeMaterialJewelry;
