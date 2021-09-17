const cardClass = require('../models/card');
const tagClass = require('../models/tag');
const objCreator = require('../middlewares/objectCreator')
const dtbFct = require('./dtb');

exports.AllUserCards = async (user) => {
  let resList = [];
  await dtbFct.selectAllUserCards(user)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let newCard = objCreator.createObj(cardClass, card);
        newCard.parseToJS();
        resList.push(newCard);
      };
    })
  return resList
};

exports.AllUserCardsByTags = async (tags) => {
  let resList = [];
  await dtbFct.selectAllUserCardsByTags(tags)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let newCard = objCreator.createObj(cardClass, card);
        newCard.parseToJS();
        resList.push(newCard);
      };
    })
  return resList
};

exports.AllUserTags = async (user) => {
  let resList = [];
  await dtbFct.selectAllUserTags(user)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let newCard = objCreator.createObj(tagClass, card);
        newCard.parseToJS();
        resList.push(newCard);
      };
    })
  return resList
};

exports.CardsToRevise = async (user) => {
  let resList = [];
  await dtbFct.selectCardsToRevise(user)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let newCard = objCreator.createObj(cardClass, card);
        newCard.parseToJS();
        resList.push(newCard);
      };
    })
  return resList
};
