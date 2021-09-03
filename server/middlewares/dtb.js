const mysqlx = require('@mysql/xdevapi');
const config = {
  password: 'pass',
  user: 'root',
  // host: 'localhost',
  // port: '3306',
  schema: 'waran_revision',
};

exports.connect = async (fctRequest) => {
  let result = [];
  await mysqlx.getSession(config)
    .catch((err) => {
      console.log(err)
      throw 'La connexion à la BDR a échouée !'
    })
    .then(async session => {
      session.startTransaction()
      try {
        await session.sql(fctRequest).execute((rows) => {
          result.push(rows[0]);
        });
        session.commit();
        session.close();
        return result
      } catch (error) {
        session.rollback();
        session.close();
        console.log(error);
        throw 'Rollback...'
      }
    })
    .catch((err) => {
      console.log(err)
      throw 'Problème avec la BDR.'
    });
  if (result.length == 1) result = result[0];
  return result
};

exports.selectCard = async (card) => {
  let id = Number.isInteger(parseInt(card)) ? card : card.id;
  return await this.connect("SELECT JSON_OBJECT('id', id, 'recto', recto, 'verso', verso, 'streak', streak, 'next_revision', next_revision, 'user_id', user_id, 'required_cards', required_cards) FROM cards WHERE id = " + id + ";");
};

exports.selectLastUserCard = async (user) => {
  let id = Number.isInteger(parseInt(user)) ? user : user.id;
  return await this.connect("SELECT JSON_OBJECT('id', id, 'recto', recto, 'verso', verso, 'streak', streak, 'next_revision', next_revision, 'user_id', user_id, 'required_cards', required_cards) FROM cards WHERE user_id = " + id + " ORDER BY id DESC LIMIT 1;");
};

exports.createCard = async (card) => {
  card.parseToMySQL();
  return await this.connect('INSERT INTO cards (recto, verso, streak, next_revision, user_id, required_cards) values(' + card.recto + ', ' + card.verso + ', ' + card.streak + ', ' + card.next_revision + ', ' + card.user_id + ', ' + card.required_cards + ');')
};

exports.updateCard = async (card) => {
  card.parseToMySQL();
  return await this.connect('UPDATE cards SET recto = ' + card.recto + ', verso = ' + card.verso + ', streak = ' + card.streak + ', next_revision = ' + card.next_revision + ', required_cards = ' + card.required_cards + ' WHERE id = ' + card.id + ';');
};

exports.deleteCard = async (card) => {
  let id = Number.isInteger(parseInt(card)) ? card : card.id;
  return await this.connect('DELETE FROM cards WHERE id = ' + id + ';');
};

exports.selectCardsToRevise = async (user) => {
  let id = Number.isInteger(parseInt(user)) ? user : user.id;
  return await this.connect("SELECT JSON_OBJECT('id', id, 'recto', recto, 'verso', verso, 'streak', streak, 'next_revision', next_revision, 'user_id', user_id, 'required_cards', required_cards) FROM cards WHERE user_id = " + id + " AND next_revision < NOW();");
};

exports.selectCardTags = async (user) => {
  let id = Number.isInteger(parseInt(user)) ? user : user.id;
  return await this.connect("SELECT * FROM tags JOIN cards_tags ON tags.id JOIN cards ON cards_tags.card_id WHERE cards.id = " + id + ";");
};

exports.selectAllTags = async () => {
  return await this.connect("SELECT * FROM tags;");
};
