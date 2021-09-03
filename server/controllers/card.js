const cardFct = require('../middlewares/card');
const dtbFct = require('../middlewares/dtb');

module.exports = async (req, res, next) => {
  let newCard = cardFct.createObjCard(req.body);

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
