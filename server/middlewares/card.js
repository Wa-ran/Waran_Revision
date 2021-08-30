const Card = require('../models/card');
const dtb = require('./dtb');

exports.createCard = (dataObject) => {
  let cardArgsList = getFctArgsName(Card);
  let paramsList = [];
  for (argName of cardArgsList) {
    let paramsValue = null;
    for (let [key, value] of dataObject) {
      if (key === argName) {
        return paramsValue = value
      }
    }
    paramsList.push(paramsValue)
  };

  return new Card(...paramsList)
};

exports.selectAllUserCard = (user_id) => {
  dtb.connect('SELECT * FROM cards WHERE user_id = ' + user_id + ';')
};
