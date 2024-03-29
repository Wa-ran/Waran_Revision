const createObj = require('./createObj');
const fctArgsNames = require('./fctArgsNames');

exports.insertRequest = (obj) => {
  let req = `INSERT INTO ${obj.constructor.name.toLowerCase().slice(3)}s (`;
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
  let req = `UPDATE ${obj.constructor.name.toLowerCase().slice(3)}s SET`;
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
        console.log("Rollback done")
        throw error
      }
    })
    .catch((err) => {
      console.log('Problème avec la BDR.')
      throw err
    });
  // if (result.length == 1) result = result[0];
  return result
};

exports.makeReq = async (req) => {
  return await this.connect(req);
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

exports.selectAllDeckCards = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('card') + ") FROM cards WHERE cards.deck_id = " + req.deck.id + ";");
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

exports.selectCardsToReviseOnDeck = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('card') + ") FROM cards WHERE cards.deck_id = " + req.deck.id + " AND next_revision < NOW() OR cards.deck_id = " + req.deck.id + " AND next_revision IS NULL ORDER BY cards.id;");
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

exports.selectLastUserDeck = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('deck') + ") FROM decks WHERE user_id = " + req.user.id + " ORDER BY id DESC LIMIT 1;");
};

exports.selectDeck = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('deck') + ") FROM decks WHERE id = " + req.deck.id + ";");
};

exports.selectDeckInfos = async (req) => {
  let res = await this.connect("SELECT JSON_OBJECT('cards_total_number', COUNT(*), 'cards_to_revise', SUM(CASE WHEN next_revision < NOW() THEN 1 WHEN next_revision IS NULL THEN 1 ELSE 0 END), 'high_level_cards', SUM(level > 19),'new_cards', SUM(CASE WHEN level < 7 THEN 1 WHEN level IS NULL THEN 1 ELSE 0 END)) FROM cards WHERE deck_id = " + req.deck.id + ";");
  let min_level = await this.connect("SELECT MIN(IFNULL(level, 0)) FROM cards WHERE deck_id = " + req.deck.id + ";");
  res[0]['min_level'] = min_level[0];
  return res
};

exports.updateCard = async (req) => {
  let card = createObj("dtbCard", req.card);
  return await this.connect(this.updateRequest(card));
};

exports.updateDeck = async (req) => {
  let deck = createObj("dtbDeck", req.deck);
  return await this.connect(this.updateRequest(deck));
};

exports.updateUser = async (req) => {
  let user = createObj("dtbUser", req.user);
  // not the password
  return await this.connect(`UPDATE users SET hide_card = ${user.hide_card}, chrono_card = ${user.chrono_card}, fast_mode = ${user.fast_mode}, dark_mode = ${user.dark_mode}, hide_form_modal = ${user.hide_form_modal}, show_form_options = ${user.show_form_options} WHERE users.id = ${user.id};`);
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

exports.selectAllCards = async () => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonObj('card') + ") FROM cards WHERE id > 0;");
};
