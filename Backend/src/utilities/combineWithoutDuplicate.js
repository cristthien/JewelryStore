module.exports = function combineAndRemoveDuplicates(
  fuzzyResults,
  semanticResults
) {
  const result = [...semanticResults];
  const lengthfuzz = fuzzyResults.length;
  const lengthSematic = semanticResults.length;

  for (let i = 0; i < lengthfuzz; i++) {
    const currid = fuzzyResults[i]._id.toString();
    let flag = false;
    for (let k = 0; k < lengthSematic; k++) {
      if (currid == semanticResults[k]._id.toString()) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      result.push(fuzzyResults[i]);
    }
  }
  console.log(result.length);
  return result;
};
