const createObj = require('./createObj');
const fctArgsNames = require('./fctArgsNames');

exports.insertRequest = (obj) => {
  let req = `INSERT INTO ${obj.constructor.name.toLowerCase()}s (`;
  for (let params of fctArgsNames(obj)) {
    req += `${params}, `
  }
  req = req.substring(0, req.length - 2);
  req += ')';
  req += ` VALUE (`;
  for (let params of fctArgsNames(obj)) {
    req += `${obj[params]}, `
  }
  req = req.substring(0, req.length - 2);
  req += ');';

  return req;
};

exports.updateRequest = (obj) => {
  let req = `UPDATE ${obj.constructor.name.toLowerCase()}s SET`;
  for (let params of fctArgsNames(obj)) {
    req += ` ${params} = ${obj[params]},`
  }
  req = req.substring(0, req.length - 1);
  req += ` WHERE id = ${obj.id};`;

  return req;
};

exports.jsonObj = (objName) => {
  let req = '';
  for (let params of fctArgsNames("dtb" + objName.charAt(0).toUpperCase() + objName.slice(1))) {
    req += `'${params}', ${objName}s.${params}, `
  }
  req = req.substring(0, req.length - 2);

  return req;
};

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
  // if (result.length == 1) result = result[0];
  return result
};

exports.createCard = async (req) => {
  let card = createObj("dtbCard", req.card);
  await this.connect(this.insertRequest(card));
};

exports.createDeck = async (req) => {
  let deck = createObj("dtbDeck", req.deck);
  await this.connect(this.insertRequest(deck));
};

exports.selectAllUserCards = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('card') + ") FROM cards WHERE user_id = " + req.user.id + ";");
};

exports.selectAllCardsOnDeck = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('card') + ") FROM cards WHERE cards.user_id = " + req.user.id + " AND cards.deck_id = " + req.deck.id + ";");
};

exports.selectAllUserDecks = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('deck') + ") FROM decks WHERE user_id = " + req.user.id + ";");
};

exports.selectCard = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('card') + ") FROM cards WHERE id = " + req.card.id + ";");
};

exports.selectCardsToRevise = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('card') + ") FROM cards WHERE user_id = " + req.user.id + " AND next_revision < NOW();");
};

exports.selectDeckInfos = async (req) => {
  return await this.connect("SELECT JSON_OBJECT('cards_total_number', COUNT(*), 'cards_to_revise', SUM(CASE WHEN next_revision < NOW() THEN 1 ELSE 0 END)) FROM cards WHERE deck_id = " + req.deck.id + ";");
};

exports.selectCardsToReviseOnDeck = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('card') + ") FROM cards WHERE cards.deck_id = " + req.deck.id + " AND next_revision < NOW() ORDER BY cards.id;");
};

exports.selectLastCardCreated = async () => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('card') + ") FROM cards ORDER BY id DESC LIMIT 1;");
};

exports.selectLastDeckCreated = async () => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('deck') + ") FROM decks ORDER BY id DESC LIMIT 1;");
};

exports.selectLastUserCard = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('card') + ") FROM cards WHERE user_id = " + req.user.id + " ORDER BY id DESC LIMIT 1;");
};

exports.selectDeck = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('deck') + ") FROM decks WHERE id = " + req.deck.id + ";");
};

exports.updateCard = async (req) => {
  let card = createObj("dtbCard", req.card);
  return await this.connect(this.updateRequest(card));
};

// have to use recto_image/verso_image !
// exports.updateCardImage = async (req) => {
//   let card = createObj("dtbCard", req.card);
//   return await this.connect(`UPDATE cards_tags SET has_image = ${req.card.has_image} WHERE card_id = ${card.id};`);
// };

exports.updateDeck = async (req) => {
  let deck = createObj("dtbDeck", req.deck);
  return await this.connect(this.updateRequest(deck));
};

exports.deleteCard = async (req) => {
  return await this.connect('DELETE FROM cards WHERE id = ' + req.card.id + ';');
};

exports.deleteDeck = async (req) => {
  return await this.connect('DELETE FROM decks WHERE id = ' + req.deck.id + ';');
};

exports.createUser = async (req) => {
  let user = createObj("dtbUser", req.user);
  await this.connect(this.insertRequest(user));
};

exports.selectUserByPseudo = async (req) => {
  let user = createObj("dtbUser", req.user);
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('user') + ") FROM users WHERE pseudo = " + user.pseudo + ";");
};

exports.selectUserById = async (req) => {
  let user = createObj("dtbUser", req.user);
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('user') + ") FROM users WHERE id = " + user.id + ";");
};
