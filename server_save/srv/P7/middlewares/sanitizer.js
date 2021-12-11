const bcrypt = require('bcrypt');

const { encrypt, decrypt } = require('../middlewares/crypto');

exports.cryptData = async (req) => {
  if (!req) return

  if (req.body.id) req.body['id'] = parseInt(req.body.id); // JWT 'stringify' tous les payloads

  if (req.body.tokenId && req.body.tokenId !== req.body.id) { // Uniquement en envoi de file
    throw { custMsg: "Identifiant utilisateur invalide !" }
  }

  let saneData = {};
  saneData['verifPass'] = req.body.password;
  req.params.participationId ? req.body['idParticipation'] = parseInt(req.params.participationId) : '';
  req.params.groupe ? req.body['groupe'] = decodeURIComponent(req.params.groupe) : '';

  try {
    for (const [key, value] of Object.entries(req.body)) {
      if (key.match(/(email)|(nom)|(groupe)|(titre)/)) {
        saneData[key] = encrypt(value)
      }
      else if (key.match(/(password)/)) {
        saneData[key] = await bcrypt.hash(value, 10)
      }
      else if (key.match(/(departement)/)) {
        saneData[key] = value // Département vérifé ultérieurement
      }
      else if (key.match(/^(id)/)) {
        if (!Number.isInteger(value)) {
          throw error
        } else {
          saneData[key] = value
        }
      }
      else if (!Number.isInteger(value)) {
        saneData[key] = encrypt(value)
      }
    }

    if (req.file) saneData.file = req.file

    return saneData
  } catch (error) {
    throw { custMsg: "Le format des données n'est pas accepté." }
  }
};

exports.decryptData = async (data) => {
  if (Array.isArray(data)) {
    let list = [];
    for (let elem of data) {
      list.push(await this.decryptData(elem))
    }
    data = list
  }
  else if (typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      data[key] = await this.decryptData(value)
    }
  }
  else {
    if (typeof data === 'string' && !data.match(/^(\d{4}-\d{2}-\d{2}\ )/)) {
      let decData = decrypt(data);
      if (decData === '') decData = data; // '' = decryptage d'un string non crypté
      data = decData      
    }
  }
  return data
};