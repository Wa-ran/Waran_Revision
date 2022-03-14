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
  await dtbFct.updateCard(req)
};

exports.deleteCard = async (req) => {
  await dtbFct.deleteCard(req)
};

exports.deleteImg = async (req) => {
  // php_server: "https://waran.xyz/",
  // local: "http://localhost:8000/",
  await axios
  .delete('http://localhost:8000/delete_img.php', {
    card: JSON.stringify(req.card)
  })
};

exports.getDeck = async (req) => {
  let resDeck;
  await dtbFct.selectDeck(req)
    .then(dtbDeck => {
      resDeck = createObj("deck", dtbDeck[0])
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
  await dtbFct.deleteDeck(req)
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
  await dtbFct.selectCardsToReviseOnDeck(req)
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
  }
};

exports.putUser = async (req) => {
  await dtbFct.updateUser(req)
};
