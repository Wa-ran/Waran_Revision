const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, 'RANDOM_TOKEN_SECRET', function(err, decoded) {
    try {
      if (err) {
        throw { custMsg: 'Identifiant utilisateur invalide' }
      };
      const tokenId = decoded.tokenId;
      if (req.file) { // L'id sera vérifié plus tard en cas d'envoi de fichier
        req.body['tokenId'] = tokenId;
        next();
      }
      else if (req.body.id && req.body.id != tokenId) {
        throw { custMsg: 'Identifiant utilisateur non reconnu' }
      }
      else {
        req.body['id'] = tokenId;
        next();
      }
    } catch (error) {
      console.log(error);
      let msg = error.custMsg ? error.custMsg : "Veuillez vous reconnecter.";
      res.status(500).json(msg);
    }
  });
};