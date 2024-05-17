function getCategory(query) {
  if (
    query.toLowerCase().includes("earring") ||
    query.toLowerCase().includes("earrings")
  ) {
    return "earrings";
  } else if (
    query.toLowerCase().includes("ring") ||
    query.toLowerCase().includes("rings")
  ) {
    return "ring";
  } else if (
    query.toLowerCase().includes("necklace") ||
    query.toLowerCase().includes("necklaces")
  ) {
    return "necklace";
  } else if (
    query.toLowerCase().includes("bracelet") ||
    query.toLowerCase().includes("bracelets")
  ) {
    return "bracelet";
  } else if (
    query.toLowerCase().includes("band") ||
    query.toLowerCase().includes("bands")
  ) {
    return "band";
  } else if (
    query.toLowerCase().includes("watches") ||
    query.toLowerCase().includes("watch")
  ) {
    return "watch";
  } else if (
    query.toLowerCase().includes("bag") ||
    query.toLowerCase().includes("bags")
  ) {
    return "bag";
  } else {
    return undefined;
  }
}
function getGoldType(inputString) {
  const lowerCaseInput = inputString.toLowerCase();
  const whiteColor = lowerCaseInput.includes("white");
  const roseColor = lowerCaseInput.includes("rose");

  if (whiteColor) {
    return "white gold";
  } else if (roseColor) {
    return "rose gold";
  } else {
    return null;
  }
}

function matchOptionGenerator(query) {
  const cate = getCategory(query);
  const goldType = getGoldType(query);
  let matchStage;
  if (!cate) {
    if (!goldType) {
      return null;
    } else {
      matchStage = {
        $match: {
          description: { $regex: goldType, $options: "i" },
        },
      };
    }
  } else {
    let nameFilter = [];
    if (cate === "ring") {
      nameFilter = [
        { name: { $regex: "\\b" + cate + "\\b", $options: "i" } },
        { name: { $regex: "band", $options: "i" } },
      ];
    } else {
      nameFilter = [{ name: { $regex: "\\b" + cate + "\\b", $options: "i" } }];
    }
    console.log(nameFilter);
    if (!goldType) {
      matchStage = {
        $or: nameFilter,
      };
    } else {
      matchStage = {
        $or: nameFilter,
        description: { $regex: goldType, $options: "i" },
      };
    }
  }

  return { $match: matchStage };
}
module.exports = matchOptionGenerator;
