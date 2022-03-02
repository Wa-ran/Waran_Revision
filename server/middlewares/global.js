const dtbFct = require('./dtb');
const createObj = require('./createObj');
const { encrypt, decrypt } = require('../middlewares/crypto');

// For v.2 : don't forget to drop the triggers !!

exports.commentUpdateAllCard = async () => {
  await dtbFct.selectAllCards()
    .then(async (list) => {
      for (card of list) {
        let objCard = createObj("card", card);
        objCard = this.commentUpdate(objCard);
        await dtbFct.updateCard({ card: objCard });
      };
    })
};

exports.commentUpdate = (card) => {
  let comment = card.comment;
  if (!comment || comment.indexOf('_') === -1) return card

  let comm1 = comment.slice(0, comment.indexOf('_'));
  let comm2 = comment.slice(comment.indexOf('_') + 1);

  if (comm1.length > 0) comm1 = decrypt(comm1)
  if (comm2.length > 0) comm2 = decrypt(comm2)

  if (comm1.length > 0 && comm2.length > 0) comm1 += "<br/><br/>___<br/><br/>"

  comment = comm1 + comm2;
  if (!comment) comment = null
  card.comment = comment

  return card
};