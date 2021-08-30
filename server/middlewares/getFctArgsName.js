module.exports = (fct) => {
  return fct.toString().match(/\(.*?\)/)[0].replace(/[()\s]/g, '').split(',')
};