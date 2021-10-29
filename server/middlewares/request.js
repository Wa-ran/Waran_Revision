const dtbFct = require('./dtb');
const createObj = require('./createObj');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getCard = async (req) => {
  let resCard;
  await dtbFct.selectCard(req.card)
    .then(dtbCard => {
      resCard = createObj("card", dtbCard)
    })
  return resCard
};

exports.postCard = async (req) => {
  if (Number.isInteger(req.card.id)) {
    throw "Id déjà existant"
  } else {
    await dtbFct.createCard(req.card)
  }
};

exports.putCard = async (req) => {
  req.card.calculNextRevision();
  req.card.inverseRectoVerso();
  await dtbFct.updateCard(req.card);
};

exports.deleteCard = async (req) => {
  await dtbFct.deleteCard(req.card)
};

exports.getTag = async (req) => {
  let resTag;
  await dtbFct.selectTag(req.tag)
    .then(dtbTag => {
      resTag = createObj("tag", dtbTag)
    })
  return resTag
};

exports.postTag = async (req) => {
  if (req.tag.id) {
    throw "Id déjà existant"
  } else {
    await dtbFct.createTag(req.tag)
  }
};

exports.putTag = async (req) => {
  await dtbFct.updateTag(req.tag)
};

exports.deleteTag = async (req) => {
  await dtbFct.deleteTag(req.tag)
};

exports.getAllUserCards = async (req) => {
  let resList = [];
  await dtbFct.selectAllUserCards(req.user)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getAllUserCardsByTagsAND = async (req) => {
  let resList = [];
  await dtbFct.selectAllUserCardsByTagsAND(req.user, req.tag)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getAllUserCardsByTagsOR = async (req) => {
  let resList = [];
  await dtbFct.selectAllUserCardsByTagsOR(req.user, req.tag)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getAllUserTags = async (req) => {
  let resList = [];
  await dtbFct.selectAllUserTags(req.user)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (tag of list) {
        let objTag = createObj("tag", tag);
        resList.push(objTag);
      };
    })
  return resList
};

exports.getCardsToRevise = async (req) => {
  let resList = [];
  await dtbFct.selectCardsToRevise(req.user)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.postgetCardsToReviseByTagsAND = async (req) => {
  let resList = [];
  await dtbFct.selectCardsToReviseByTagsAND(req.user, req.tag)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.postgetCardsToReviseByTagsOR = async (req) => {
  let resList = [];
  await dtbFct.selectCardsToReviseByTagsOR(req.user, req.tag)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (card of list) {
        let objCard = createObj("card", card);
        resList.push(objCard);
      };
    })
  return resList
};

exports.getCardTags = async (req) => {
  let resList = [];
  await dtbFct.selectCardTags(req.card)
    .then((list) => {
      if (!Array.isArray(list)) {
        list = [list]
      }
      for (tag of list) {
        let objTag = createObj("tag", tag);
        resList.push(objTag);
      };
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
          dtbFct.createCardTag(req.card, tag)
        };
      }
    })
};

exports.postCardWithTags = async (req) => {
  await this.postCard(req)
    .then(() => {
      return dtbFct.selectLastUserCard(req.user)
    })
    .then(async (dtbCard) => {
      req.card = createObj("card", dtbCard);
      for await (tag of req.tag) {
        dtbFct.createCardTag(req.card, tag)
      };
    })
};

exports.deleteCardTags = async (req) => {
  await dtbFct.deleteCardTag(req.card, req.tag)
};

exports.postgetUser = async (req) => {
  let resUser;
  let reqUser = createObj("user", req.user);
  let dtbUser;
  await dtbFct.selectUser(req.user)
    .then(async (selectedUser) => {
      dtbUser = selectedUser;
      if (await bcrypt.compare(reqUser.password, selectedUser.password)) return
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
        { expiresIn: '24h' }
      );
    })
  return resUser
};

exports.postUser = async (req) => {
  if (Number.isInteger(req.user.id)) {
    throw "Id déjà existant"
  } else {
    await req.user.cryptPassword().then(() => dtbFct.createUser(req.user))
  }
};