const dtbFct = require('./dtb');
const createObj = require('./createObj');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getCard = async (req) => {
  let resCard;
  await dtbFct.selectCard(req)
    .then(dtbCard => {
      resCard = createObj("card", dtbCard[0])
    })
  return resCard
};

exports.getLastCard = async (req) => {
  let resCard;
  await dtbFct.selectLastUserCard(req)
    .then(dtbCard => {
      resCard = createObj("card", dtbCard[0])
    })
  return resCard
};

exports.postCard = async (req) => {
  if (Number.isInteger(req.card.id)) {
    throw "Id déjà existant"
  } else {
    await dtbFct.createCard(req)
      .then(() => {
        if (req.tag.length > 0) return this.newCardTags(req)
      })
  }
};

exports.newCardTags = async (req) => {
  await this.getLastCard(req)
    .then(async (lastCard) => {
      req.card = lastCard;
      let tagsList = req.tag;
      for await (tag of tagsList) {
        req.tag = tag;
        dtbFct.createCardTag(req)
      };
    })
    .then(() => {
      if (req.assets.order.length > 0) return this.putCardOrder(req)
    })
};

exports.putCard = async (req) => {
  req.card.calculNextRevision();
  req.card.inverseRectoVerso();
  await dtbFct.updateCard(req);
};

exports.deleteCard = async (req) => {
  await dtbFct.deleteCard(req)
};

exports.getTag = async (req) => {
  let resTag;
  await dtbFct.selectTag(req)
    .then(dtbTag => {
      resTag = createObj("tag", dtbTag[0])
    })
  return resTag
};

exports.postTag = async (req) => {
  if (req.tag.id) {
    throw "Id déjà existant"
  } else {
    await dtbFct.createTag(req)
  }
};

exports.putTag = async (req) => {
  await dtbFct.updateTag(req)
};

exports.deleteTag = async (req) => {
  await dtbFct.deleteTag(req)
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

exports.getAllUserCardsByTagsAND = async (req) => {
  let resList = [];
  await dtbFct.selectAllUserCardsByTagsAND(req)
    .then((list) => {
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getAllUserCardsByTagsOR = async (req) => {
  let resList = [];
  await dtbFct.selectAllUserCardsByTagsOR(req)
    .then((list) => {
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getAllUserTags = async (req) => {
  let resList = [];
  await dtbFct.selectAllUserTags(req)
    .then((list) => {
      for (tag of list) {
        let objTag = createObj("tag", tag);
        resList.push(objTag);
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

exports.postgetCardsToReviseByTagsAND = async (req) => {
  let resList = [];
  await dtbFct.selectCardsToReviseByTagsAND(req)
    .then((list) => {
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.postgetCardsToReviseByTagsOR = async (req) => {
  let resList = [];
  await dtbFct.selectCardsToReviseByTagsOR(req)
    .then((list) => {
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getCardTags = async (req) => {
  let resList = [];
  await dtbFct.selectCardTags(req)
    .then((list) => {
      for (tag of list) {
        let objTag = createObj("tag", tag);
        resList.push(objTag);
      };
    })
  return resList
};

exports.getTagOrder = async (req) => {
  let resList = [];
  await dtbFct.selectTagOrder(req)
    .then((list) => {
      resList = list;
    })
  return resList
};

exports.postCardTags = async (req) => {
  await this.getCardTags(req)
    .then(async (DtbList) => {
      // On récupère les tags déjà associés et on enlève les doublons
      let reqList = req.tag;
      filtList = [].concat(
        reqList.filter(reqTag => DtbList.every(dtbTag => reqTag.id !== dtbTag.id)),
        DtbList.filter(dtbTag => reqList.every(reqTag => dtbTag.id !== reqTag.id))
      );
      if (filtList.length > 0) {
        for await (tag of filtList) {
          req.tag = tag;
          dtbFct.createCardTag(req)
        };
      }
    })
};

exports.putCardOrder = async (req) => {
  await this.updateCardOrder(req);
};

exports.deleteCardTags = async (req) => {
  await dtbFct.deleteCardTag(req)
};

exports.getUserById = async (req) => {
  let resUser;
  await dtbFct.selectUserById(req)
    .then(dtbUser => {
      resUser = createObj("user", dtbUser[0])
    })
  return resUser
};

exports.postgetUserByPseudo = async (req) => {
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
