// const jwt = require('jsonwebtoken');
// const fs = require('fs');
const requestFct = require('../middlewares/request');
const createObj = require('../middlewares/createObj');
const verifToken = require('../middlewares/token');
const global = require('../middlewares/global');

module.exports = async (req, res, next) => {
  let method = req.method.toLowerCase();
  let fctName = method + req.params.fctName;
  let data = {};
  let token = null;
  data["assets"] = req.body.assets;
  delete req.body.assets;

  const verifIdByToken = (obj) => {
    if (token && ((obj.user_id && obj.user_id !== token.tokenId) || (obj.pseudo && obj.id !== token.tokenId))) {
      console.log(token);
      console.log(obj.constructor.name);
      console.log(obj.id || "Pas d'id");
      console.log(obj.user_id || "Pas d'user_id");
      return false
    }
    else return true
  };

  const needToken = async () => {
    // Checked if token needed (not login or signup)
    if ((fctName !== "postUser" && fctName !== "postToGetUserByPseudo")) {
      token = verifToken(req.headers.authorization);
      return
    }
    else return
  };

  needToken().then(() => {
    if (method === "get" || method === "delete") {
      let objName = req.params.object;
      let object = { 'id': req.params.id };
      req.body[objName] = object;
    };

    for ([objName, object] of Object.entries(req.body)) {
      if (Array.isArray(object)) {
        data[objName] = [];
        let idList = [];
        // On enlève les doublons
        for (obj of object) {
          let alreadyExist = 0;
          idList.push({
            "id": obj.id,
            "name": objName,
          });
          for (double of idList) {
            if (double.id == object.id && double.name == object.name) {
              alreadyExist++;
            };
          };

          if (alreadyExist == 2) continue
          else {
            let newObj = createObj(objName, obj);
            if (method !== 'get' && !verifIdByToken(newObj)) {
              throw 'Token invalide'
            }
            else data[objName].push(newObj);
          };
        };
      }
      else {
        let newObj = createObj(objName, object);
        if (method !== 'get' && !verifIdByToken(newObj)) {
          throw 'Token invalide'
        }
        else data[objName] = newObj;
      };
    };
  })
    .then(() => {
      if (data.assets && data.assets.global && data.user.id === 2) {
        return global[data.assets.global.fctName](data.assets.global.data || null)
      }
    })
    .then(() => requestFct[fctName](data))
    .then((response) => {
      if (response) {
        let result;
        if (Array.isArray(response)) {
          result = [];
          for (obj of response) {
            let i = 0;
            if (method === 'get' && !verifIdByToken(obj) && i < 2) {
              throw 'Token invalide'
            };
            i++;
            result.push(obj.beforeSend());
          };
        }
        else {
          if (method === 'get' && !verifIdByToken(response)) {
            throw 'Token invalide'
          };
          result = response.beforeSend();
        }

        res.send(result)
      }
      else res.sendStatus(200)
    })
    .catch((error) => {
      console.log(fctName);
      console.log(new Date(Date.now()).toString());
      console.log(new Date(Date.now()).toLocaleDateString('fr', {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }));
      console.log(error);
      console.log('_________________________________________');
      res.status(500).json(error.custMsg)
    })
};

// exports.signup = (req, res, next) => {
//   cryptData(req)
//     .then((data) => {
//       return user.createUser(data)
//     })
//     .then(() => res.sendStatus(201))
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json(error.custMsg)
//     })
// };

// exports.login = (req, res, next) => {
//   cryptData(req)
//     .then((data) => {
//       return user.selectProfil(data)
//     })
//     .then(async (profil) => {
//       profil = await decryptData(profil);
//       delete profil.password;

//       let tokenId = profil.id;
//       profil.token = jwt.sign(
//         { tokenId },
//         'RANDOM_TOKEN_SECRET',
//         { expiresIn: '24h' }
//       )
//       res.send(profil)
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json(error.custMsg)
//     })
// };

// exports.putInfos = (req, res, next) => {
//   cryptData(req)
//     .then((data) => {
//       return user.putInfos(data)
//     })
//     .then(async (profil) => {
//       profil = await decryptData(profil);
//       res.status(200).send(profil)
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json(error.custMsg)
//     })
// };

// exports.putEmail = (req, res, next) => {
//   cryptData(req)
//     .then((data) => {
//       return user.putEmail(data)
//     })
//     .then(() => res.sendStatus(204))
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json(error.custMsg)
//     })
// };

// exports.putPass = (req, res, next) => {
//   cryptData(req)
//     .then((data) => {
//       return user.putPass(data)
//     })
//     .then(() => res.sendStatus(204))
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json(error.custMsg)
//     })
// };

// exports.avatar = (req, res, next) => {
//   if (!req.file) throw { custMsg: "Pas d'image selectionnée." }

//   let path = req.file.path;
//   let newPath = 'images/avatars/' + req.body.id + '_avatar.webp';
//   let miniPath = 'images/avatars/' + req.body.id + '_avatar_mini.webp';

//   cryptData(req)
//     .then((data) => {
//       return user.selectProfil(data)
//     })
//     .then(() => { // avatar existant ?
//       try {
//         fs.unlink(newPath);
//         fs.unlink(miniPath);
//       } catch (error) { };
//     })
//     .then(() => {
//       return sharp(path)
//         .resize(200, 200)
//         .toFile(newPath);
//     })
//     .then(() => {
//       return sharp(path)
//         .resize(40, 40)
//         .toFile(miniPath);
//     })
//     .then(() => { // suppr temp
//       return fs.unlink(req.file.path, (err) => {
//         if (err) return console.log(err)
//       })
//     })
//     .then(() => res.sendStatus(201))
//     .catch((error) => {
//       if (req.file) {
//         fs.unlink(req.file.path, (err) => {
//           if (err) return console.log(err)
//         })
//       }
//       console.log(error);
//       res.status(500).json(error.custMsg)
//     })
// };

// exports.delete = (req, res, next) => {
//   cryptData(req)
//     .then((data) => {
//       return user.delete(data)
//     })
//     .then(() => {
//       fs.access('images/avatars/' + req.id + '_avatar.webp', err => {
//         if (err) { return }
//         else {
//           fs.unlink('images/avatars/' + req.id + '_avatar.webp', (err) => { if (err) console.log(err) });
//           fs.unlink('images/avatars/' + req.id + '_avatar_mini.webp', (err) => { if (err) console.log(err) })
//         }
//       })
//     })
//     .then(() => res.sendStatus(204))
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json(error.custMsg)
//     })
// };