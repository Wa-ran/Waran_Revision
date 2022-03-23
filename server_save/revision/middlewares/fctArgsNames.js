module.exports = (fct) => {
  let res;
  if (typeof fct === 'string' || fct instanceof String) {
    let classConst = require('../models/' + fct);
    fct = classConst;
  }
  try {
    res = fct.toString().match(/\(.*?\)/)[0].replace(/[()\s]/g, '').split(',')
  } catch (error) {
    res = [];
    for (let [key, value] of Object.entries(fct)) {
      res.push(key)
    }
  }
  return res;
};
