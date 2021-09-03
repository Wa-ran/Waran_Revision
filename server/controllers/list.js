const listFct = require('../middlewares/list');

module.exports = async (req, res, next) => {
  let route = req.path.split("/");
  let fct = route[1];
  let user_id = route[route.length - 1];

  await listFct[fct](user_id)
    .then((list) => {
      res.send(list)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.custMsg)
    })
};
