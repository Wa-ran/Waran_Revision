const cardFct = require('./card');
const dtbFct = require('./dtb');

exports.AllUserCards = async (reqCard) => {
  let resCard;
  await dtbFct.selectCard(reqCard)
    .then(dtbCard => {
      resCard = this.createObjCard(dtbCard)
    })
  return resCard
};

exports.CardsToRevise = async (user) => {
  let resList = [];
  await dtbFct.selectCardsToRevise(user)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let newCard = cardFct.createObjCard(card);
        newCard.parseToJS();
        resList.push(newCard);
      };
    })
  return resList
};

exports.TagedCards = async (reqCard) => {
  let resCard;
  await dtbFct.selectCard(reqCard)
    .then(dtbCard => {
      resCard = this.createObjCard(dtbCard)
    })
  return resCard
};

exports.AllTags = async (reqCard) => {
  let resCard;
  await dtbFct.selectCard(reqCard)
    .then(dtbCard => {
      resCard = this.createObjCard(dtbCard)
    })
  return resCard
};
