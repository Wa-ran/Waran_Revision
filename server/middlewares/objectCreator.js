// const cardClass = require('../models/card');
// const tagClass = require('../models/tag');
// const userClass = require('../models/user');

exports.getFctArgsName = (fct) => {
  return fct.toString().match(/\(.*?\)/)[0].replace(/[()\s]/g, '').split(',')
};

exports.createObj = (classKey, dataObj) => {
  let classConst = require('../models/' + classKey);
  let argsList = this.getFctArgsName(classConst);
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