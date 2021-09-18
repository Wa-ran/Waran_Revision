// const jwt = require('jsonwebtoken');
// const fs = require('fs');
const requestFct = require('../middlewares/request');
const objCreator = require('../middlewares/objectCreator');

module.exports = async (req, res, next) => {
  let method = req.method.toLowerCase();
  let fctName = method + req.params.fctName;
  let data = {};

  if (method === "get") {
    let objName = req.params.object;
    let object = { 'id': req.params.id };
    req.body[objName] = object;
  };

  for ([objName, object] of Object.entries(req.body)) {
    if (Array.isArray(object)) {
      let idList = [];
      for (obj of object) {
        let alreadyExist = 0;
        idList.push(obj.id);
        for (id of idList) {
          if (id == object.id) {
            alreadyExist++;
          };
        };

        if (alreadyExist == 2) return
        else {
          data[objName] = [];
          data[objName].push(objCreator.createObj(objName, obj));
        };
      };
    }
    else {
      data[objName] = objCreator.createObj(objName, object);
    };
  };

  await requestFct[fctName](data)
    .then((response) => {
      let result;
      if (Array.isArray(response)) {
        result = [];
        for (obj of response) {
          obj.parseToJS();
          result.push(obj);
        };
      }
      else result = response.parseToJS();

      res.send(result)
    })
    .catch((error) => {
      console.log(error);
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