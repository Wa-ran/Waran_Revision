const dtbFct = require('./dtb');
const objCreator = require('./objectCreator')

exports.getCard = async (req) => {
  let resCard;
  await dtbFct.selectCard(req.card)
    .then(dtbCard => {
      resCard = objCreator.createObj("card", dtbCard)
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
      resTag = objCreator.createObj("tag", dtbTag)
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
        let objCard = objCreator.createObj("card", card);
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
        let objCard = objCreator.createObj("card", card);
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
        let objCard = objCreator.createObj("card", card);
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
        let objTag = objCreator.createObj("tag", tag);
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
        let objCard = objCreator.createObj("card", card);
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
        let objCard = objCreator.createObj("card", card);
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
        let objCard = objCreator.createObj("card", card);
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
        let objTag = objCreator.createObj("tag", tag);
        resList.push(objTag);
      };
    })
  return resList
};

exports.postCardTags = async (req) => {
  let resList;
  await new Promise(async () => {
    for await (tag of req.tag) {
      dtbFct.createCardTag(req.card, tag)
    };
    resList = await this.getCardTags(req)
  })
  return resList
};

exports.deleteCardTags = async (req) => {
  await dtbFct.deleteCardTag(req.card, req.tag)
};

exports.getUser = async (req) => {
  let resUser;
  await dtbFct.selectUser(req.user)
    .then(dtbUser => {
      resUser = objCreator.createObj("user", dtbUser)
    })
  return resUser
};

exports.postUser = async (req) => {
  if (Number.isInteger(req.user.id)) {
    throw "Id déjà existant"
  } else {
    await dtbFct.createUser(req.user)
  }
};