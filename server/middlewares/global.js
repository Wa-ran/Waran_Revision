const dtbFct = require('./dtb');
const createObj = require('./createObj');
const { encrypt, decrypt } = require('../middlewares/crypto');

// For v.2 : don't forget to drop the triggers !!
exports.commentUpdateAllCard = async () => {
  await dtbFct.selectAllCards()
    .then(async (list) => {
      for (card of list) {
        card = this.commentUpdate(card);
        let objCard = createObj("card", card);
        await dtbFct.updateCard({ card: objCard });
      };
    })
    .then(() => { throw { custMsg: 'global: commentUpdateAllCard' } })
};
exports.commentUpdate = (card) => {
  let comment = card.comment;
  if (!comment || comment.indexOf('_') === -1) return card

  let comm1 = comment.slice(0, comment.indexOf('_'));
  let comm2 = comment.slice(comment.indexOf('_') + 1);
  if (comm1.length > 0) comm1 = decrypt(comm1)
  if (comm2.length > 0) comm2 = decrypt(comm2)

  if (comm1.length > 0 && comm2.length > 0) comm1 += "<br/><br/>___<br/><br/>"

  comment = ''.concat(comm1, comm2);
  if (comment === '') comment = null
  card.comment = encrypt(comment)

  return card
};

// Card text style update
exports.textUpdateAllCard = async () => {
  await dtbFct.selectAllCards()
    .then(async (list) => {
      for (card of list) {
        let objCard = createObj("card", card);
        objCard = this.textUpdate(objCard);
        await dtbFct.updateCard({ card: objCard });
      };
    })
    .then(() => { throw { custMsg: 'global: textUpdateAllCard' } })
};
exports.textUpdate = (card) => {
  const update = (text) => {
    text = text.replace(/style=[^>]*bold[^>]*>/g, 'class="bold">');
    text = text.replace(/style=[^>]*italic[^>]*>/g, 'class="italic">');
    text = text.replace(/style=[^>]*underline[^>]*>/g, 'class="underline">');
    text = text.replace(/<del>/g, '<span class="linethrough">');
    text = text.replace(/<\/del>/g, '</span>');
    text = text.replace(/style="[^>]*"/g, '');
    return text
  }
  card.recto = update(card.recto);
  card.verso = update(card.verso);
  if (card.comment) card.comment = update(card.comment);

  return card
};

// New user deck
exports.newUserDeck = async (data) => {
  let user = createObj("dtbUser", data.user);
  let userId;
  let deck = createObj("deck", data.deck);
  await dtbFct.makeReq(`SELECT id FROM users WHERE pseudo = ${user.pseudo};`)
  .then((res) => {
    userId = res[0];
    deck.user_id = userId;
    deck.id = null;
    return dtbFct.createDeck({deck})
  })
  .then(() => {
    return dtbFct.makeReq(`SELECT id FROM decks WHERE user_id = ${deck.user_id} ORDER BY id DESC LIMIT 1;`)
  })
  .then(async (res) => {
    for (card of data.cards) {
      let objCard = createObj("card", card);
      objCard.deck_id = res[0];
      objCard.user_id = userId;
      objCard.id = null;
      await dtbFct.createCard({ card: objCard });
    };
  })
  .then(() => { throw { custMsg: 'global: newUserDeck' } })
};

// Get users
exports.getUsers = async () => {
  let list = [];
  await dtbFct.makeReq(`SELECT * FROM users;`)
  .then(async (users) => {
    for (let userId of users) {
      let user = createObj("user", { "id": userId });
      await dtbFct.selectUserById({ user })
      .then((res) => {
        let objUser = createObj("user", res[0]).beforeSend();
        return list.push(objUser)
      })
    };
  })
  .then(() => { throw { custMsg: JSON.stringify(list) } })
};