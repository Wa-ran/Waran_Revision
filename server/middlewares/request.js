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
  let resCard;
  if (Number.isInteger(req.card.id)) {
    resCard = await this.putOneCard(req.card)
  } else {
    await dtbFct.createCard(req.card)
      .then((newcard) => {
        resCard = objCreator.createObj("card", newcard);
      })
  }
  return resCard
};

exports.putCard = async (req) => {
  let resCard;
  req.card.calculNextRevision();
  req.card.inverseRectoVerso();
  await dtbFct.updateCard(req.card)
    .then(() => {
      resCard = this.getOneCard(req.card)
    })
  return resCard
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
  let resTag;
  if (req.tag.id) {
    resTag = await this.putTag(req.tag)
  } else {
    await dtbFct.createTag(req.tag)
      .then((newTag) => {
        resTag = objCreator.createObj("tag", newTag);
      })
  }
  return resTag
};

exports.putTag = async (req) => {
  let resTag;
  await dtbFct.updateTag(req.tag)
    .then(() => {
      resTag = this.getOneTag(req.tag)
    })
  return resTag
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

exports.getAllUserCardsByTags = async (req) => {
  let resList = [];
  await dtbFct.selectAllUserCardsByTags(req.user, req.tag)
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
      await dtbFct.createCardTag(req.card, tag)
    }
  })
    .then(async () => {
      resList = await this.postGetCardTags(req)
    })
  return resList
};
