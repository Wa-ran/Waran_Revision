const dtbFct = require('./dtb');
const createObj = require('./createObj');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios')

exports.getCard = async (req) => {
  let resCard;
  await dtbFct.selectCard(req)
    .then(dtbCard => {
      resCard = createObj("card", dtbCard[0])
    })
  return resCard
};

exports.getLastUserCard = async (req) => {
  let resCard;
  await dtbFct.selectLastUserCard(req)
    .then(dtbCard => {
      resCard = createObj("card", dtbCard[0])
    })
  return resCard
};

exports.getLastUserDeck = async (req) => {
  let resDeck;
  await dtbFct.selectLastUserDeck(req)
    .then(dtbDeck => {
      resDeck = createObj("deck", dtbDeck[0])
    })
  return resDeck
};

exports.postCard = async (req) => {
  if (Number.isInteger(req.card.id)) {
    throw "Id déjà existant"
  } else {
    await dtbFct.createCard(req)
  }
};

exports.putCard = async (req) => {
  req.card.updateCard();
  await this.updateImgs(req)
  .then(() => { return dtbFct.updateCard(req) })
};

exports.deleteCard = async (req) => {
  await this.deleteImgs(req)
  .then(() => { return dtbFct.deleteCard(req) })
};

exports.deleteImgs = async (req) => {
  await dtbFct.selectCard(req)
  .then(dtbCard => {
    return createObj("card", dtbCard[0])
  })
  .then((dtbCard) => {
    if (dtbCard.recto_image || dtbCard.verso_image) {
      let del = [];
      del.push(dtbCard.recto_image);
      del.push(dtbCard.verso_image);
      del = JSON.stringify(del);
      // php_server: "https://revision.waran.xyz/php/",
      // local: "http://localhost:8000/",
      return axios
      .delete('https://revision.waran.xyz/php/delete_img.php/' + del)
    }
    else return
  })
};

exports.updateImgs = async (req) => {
  if (!req.card.recto_image && !req.card.verso_image) {
    // Si image = géré par serveur php
    await dtbFct.selectCard(req)
    .then(dtbCard => {
      return createObj("card", dtbCard[0])
    })
    .then((dtbCard) => {
      if (dtbCard.recto_image || dtbCard.verso_image) {
        let del = [];
        if (dtbCard.recto_image !== req.card.recto_image && dtbCard.recto_image !== req.card.verso_image) del.push(dtbCard.recto_image);
        if (dtbCard.verso_image !== req.card.recto_image && dtbCard.verso_image !== req.card.verso_image) del.push(dtbCard.verso_image);
        del = JSON.stringify(del);
        // php_server: "https://revision.waran.xyz/php/",
        // local: "http://localhost:8000/",
        return axios
        .delete('https://revision.waran.xyz/php/delete_img.php/' + del)
      }
      else return
    })
  }
  else return
};

exports.getDeck = async (req) => {
  let resDeck;
  await dtbFct.selectDeck(req)
    .then(async dtbDeck => {
      resDeck = createObj("deck", dtbDeck[0]);
      let infos = await dtbFct.selectDeckInfos({ 'deck': resDeck });
      Object.assign(resDeck, infos[0]);
    })
  return resDeck
};

exports.postDeck = async (req) => {
  if (req.deck.id) {
    throw "Id déjà existant"
  } else {
    await dtbFct.createDeck(req)
  }
};

exports.putDeck = async (req) => {
  await dtbFct.updateDeck(req)
};

exports.deleteDeck = async (req) => {
  await this.getAllDeckCards(req)
  .then(async (res) => {
    for (let card of res) {
      if (card.recto_image || card.verso_image) {
        let del = [];
        del.push(card.recto_image);
        del.push(card.verso_image);
        del = JSON.stringify(del);
        // php_server: "https://revision.waran.xyz/php/",
        // local: "http://localhost:8000/",
        await axios
        .delete('https://revision.waran.xyz/php/delete_img.php/' + del)
      }
      else continue
    }
    return
  })
  .then(() => { return dtbFct.deleteDeck(req) })
};

exports.getAllUserCards = async (req) => {
  let resList = [];
  await dtbFct.selectAllUserCards(req)
    .then((list) => {
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getAllDeckCards = async (req) => {
  let resList = [];
  await dtbFct.selectAllDeckCards(req)
    .then((list) => {
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getAllUserDecks = async (req) => {
  let resList = [];
  await dtbFct.selectAllUserDecks(req)
    .then(async (list) => {
      for (deck of list) {
        let objDeck = createObj("deck", deck);
        let infos = await dtbFct.selectDeckInfos({ 'deck': objDeck });
        Object.assign(objDeck, infos[0]);
        resList.push(objDeck);
      };
    })
  return resList
};

exports.getCardsToRevise = async (req) => {
  let resList = [];
  await dtbFct.selectCardsToRevise(req)
    .then((list) => {
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getCardsToReviseOnDeck = async (req) => {
  let resList = [];
  let objDeck;
  await dtbFct.selectDeck(req)
    .then((dtbDeck) => {
      objDeck = createObj("deck", dtbDeck[0]);
      return dtbFct.selectDeckInfos({ 'deck': objDeck });
    })
    .then((infos) => {
      Object.assign(objDeck, infos[0]);
      if (objDeck.sequence && objDeck.cards_to_revise > 0) {
        return dtbFct.selectAllDeckCards(req)
      } else return dtbFct.selectCardsToReviseOnDeck(req)
    })
    .then((list) => {
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getUserById = async (req) => {
  let resUser;
  await dtbFct.selectUserById(req)
    .then(dtbUser => {
      resUser = createObj("user", dtbUser[0])
    })
  return resUser
};

exports.postToGetUserByPseudo = async (req) => {
  let resUser;
  let reqUser = createObj("user", req.user);
  let dtbUser;
  await dtbFct.selectUserByPseudo(req)
    .then(async (selectedUser) => {
      dtbUser = selectedUser[0];
      if (await bcrypt.compare(reqUser.password, selectedUser[0].password)) return
      else throw 'error'
    })
    .catch((err) => {
      console.log(err)
      throw { custMsg: 'Mot de passe incorrect >:(' }
    })
    .then(() => {
      resUser = createObj("user", dtbUser);
      let tokenId = resUser.id;
      resUser['token'] = jwt.sign(
        { tokenId },
        'b$UKq/Tjy9lCriz$$YUUTXCMo.obIcG/AO4',
        { expiresIn: '6h' }
      );
    })
  return resUser
};

exports.postUser = async (req) => {
  if (Number.isInteger(req.user.id)) {
    throw "Id déjà existant"
  } else {
    await req.user.cryptPassword().then(() => dtbFct.createUser(req))
    .catch((error) => {
      if (error.info.code === 1062) throw { custMsg: "Pseudo déjà utilisé" }
      throw error
    })
  }
};

exports.putUser = async (req) => {
  await dtbFct.updateUser(req)
};
