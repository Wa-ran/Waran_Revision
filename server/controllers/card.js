const dtb = require('../middlewares/dtb');
const cardFct = require('../middlewares/card');
const Card = require('../models/card');

exports.getOneCard = (req, res, next) => {
  let newCard = cardFct.createCard(req.card);

  newCard.dtbSelectCard()
    .then((newCard) => {
      res.status(200).send(newCard)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.custMsg)
    })
};

exports.getAllUserCards = (req, res, next) => {
  dtb.selectAllUserCards(req.user_id)
    .then((cards) => {
      res.status(200).send(cards)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.custMsg)
    })
};

exports.postOneCard = (req, res, next) => {
  let newCard = cardFct.createCard(req.card);

  newCard.dtbCreateCard()
    .then((newCard) => {
      this.getOneCard(newCard)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.custMsg)
    })
};

exports.putOneCard = (req, res, next) => {
  let newCard = cardFct.createCard(req.card);

  newCard.dtbUpdateCard()
    .then((newCard) => {
      res.status(200).send(newCard)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.custMsg)
    })
};

exports.deleteOneCard = (req, res, next) => {
  let newCard = cardFct.createCard(req.card);

  newCard.dtbDeleteCard()
    .then((newCard) => {
      res.status(200).send(newCard)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.custMsg)
    })
};