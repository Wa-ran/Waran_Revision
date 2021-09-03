const ClassCard = require('../models/card');
const dtbFct = require('./dtb');
const getFctArgsName = require("./getFctArgsName");

exports.createObjCard = (dataObject) => {
  let cardArgsList = getFctArgsName(ClassCard);
  let paramsList = [];
  for (argName of cardArgsList) {
    let paramsValue = null;
    for (let [key, value] of Object.entries(dataObject)) {
      if (key === argName) {
        paramsValue = value
        continue
      }
    }
    paramsList.push(paramsValue)
  };
  return new ClassCard(...paramsList)
};

exports.getOneCard = async (reqCard) => {
  let resCard;
  await dtbFct.selectCard(reqCard)
    .then(dtbCard => {
      resCard = this.createObjCard(dtbCard)
    })
  return resCard
};

exports.postOneCard = async (reqCard) => {
  let resCard;
  if (Number.isInteger(reqCard.id)) {
    resCard = await this.putOneCard(reqCard)
  } else {
    await dtbFct.createCard(reqCard)
      .then(() => {
        return dtbFct.selectLastUserCard(reqCard.user_id)
      })
      .then((lastCard) => {
        resCard = this.createObjCard(lastCard);
      })
  }
  return resCard
};

exports.putOneCard = async (reqCard) => {
  let resCard;
  reqCard.calculNextRevision();
  await dtbFct.updateCard(reqCard)
    .then(() => {
      resCard = this.getOneCard(reqCard)
    })
  return resCard
};

exports.deleteOneCard = (req, res, next) => {
  let newCard = cardFct.createCard(req.body);

  newCard.dtbDeleteCard()
    .then((newCard) => {
      res.status(200).send(newCard)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.custMsg)
    })
};