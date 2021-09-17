const listFct = require('../middlewares/list');
const userClass = require('../models/user');

module.exports = async (req, res, next) => {
  let fctName = req.params.fctName;
  let data = null;
  // lorsque GET est utilisé, l'envoi de liste se réfère tjs à l'user
  // tags = []
  if (req.params.user_id) data = new userClass(req.params.user_id)
  else data = req.body;

  await listFct[fctName](data)
    .then((list) => {
      res.send(list)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.custMsg)
    })
};
