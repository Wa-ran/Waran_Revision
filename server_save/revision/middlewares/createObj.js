const fctArgsNames = require("./fctArgsNames");

module.exports = (classKey, dataObj) => {
  let classConst = require('../models/' + classKey);
  let argsList = fctArgsNames(classConst);
  let paramsList = [];
  for (argName of argsList) {
    let paramsValue = null;
    for (let [key, value] of Object.entries(dataObj)) {
      if (key === argName) {
        paramsValue = value
        continue
      }
    }
    paramsList.push(paramsValue)
  };
  return new classConst(...paramsList)
};