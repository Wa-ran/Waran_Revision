const cardClass = require('../models/card');
const cardFct = require('../middlewares/card');
const objCreator = require('../middlewares/objectCreator')

module.exports = async (req, res, next) => {
  let newCard = objCreator.createObj(cardClass, req.body);

  let fctName = req.baseUrl.slice(1);
  let fct = req.method.toLowerCase() + fctName;

  await cardFct[fct](newCard)
    .then((card) => {
      card.parseToJS();
      res.send(card)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.custMsg)
    })
};
