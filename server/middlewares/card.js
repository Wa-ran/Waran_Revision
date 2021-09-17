const cardClass = require('../models/card');
const objCreator = require('../middlewares/objectCreator')
const dtbFct = require('./dtb');

exports.getOneCard = async (reqCard) => {
  let resCard;
  await dtbFct.selectCard(reqCard)
    .then(dtbCard => {
      resCard = objCreator.createObj(cardClass, dtbCard)
    })
  return resCard
};

exports.postOneCard = async (reqCard) => {
  let resCard;
  if (Number.isInteger(reqCard.id)) {
    // si la carte existe
    resCard = await this.putOneCard(reqCard)
  } else {
    await dtbFct.createCard(reqCard)
      .then((newcard) => {
        resCard = objCreator.createObj(cardClass, newcard);
      })
  }
  return resCard
};

exports.putOneCard = async (reqCard) => {
  let resCard;
  reqCard.calculNextRevision();
  reqCard.inverseRectoVerso();
  await dtbFct.updateCard(reqCard)
    .then(() => {
      resCard = this.getOneCard(reqCard)
    })
  return resCard
};
