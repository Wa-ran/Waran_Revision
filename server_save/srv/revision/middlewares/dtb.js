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

exports.jsonList = (objName) => {
  let req = '';
  for (let params of fctArgsNames(objName)) {
    req += `'${params}', ${objName}s.${params}, `
  }
  req = req.substring(0, req.length - 2);

  return req;
};

const mysqlx = require('@mysql/xdevapi');
const config = {
  // password: 'pass',
  password: 'root',
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
  req.card.parseToMySQL();
  await this.connect(this.insertRequest(req.card));
};

exports.createCardTag = async (req) => {
  await this.connect('INSERT INTO cards_tags (card_id, tag_id) VALUES (' + req.card.id + ', ' + req.tag.id + ');');
};

exports.createTag = async (req) => {
  req.tag.parseToMySQL();
  await this.connect(this.insertRequest(req.tag));
};

exports.selectAllUserCards = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('card') + ") FROM cards WHERE user_id = " + req.user.id + ";");
};

exports.selectAllUserCardsByTagsAND = async (req) => {
  let tagsIdList = "(";
  for (let tag of req.tag) {
    tagsIdList += ` ${tag.id},`
  };
  tagsIdList = tagsIdList.replace(" ", "").slice(0, -1);
  tagsIdList += ")";

  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('card') + ") FROM cards JOIN cards_tags ON cards.id = cards_tags.card_id JOIN tags ON cards_tags.tag_id = tags.id WHERE cards.user_id = " + req.user.id + " AND tags.id IN " + tagsIdList + " GROUP BY cards.id HAVING COUNT(DISTINCT tags.id) = " + req.tag.length + ";");
};

exports.selectAllUserCardsByTagsOR = async () => {
  let tagsIdList = "(";
  for (let tag of req.tag) {
    tagsIdList += ` ${tag.id},`
  };
  tagsIdList = tagsIdList.replace(" ", "").slice(0, -1);
  tagsIdList += ")";

  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('card') + ") FROM cards JOIN cards_tags ON cards.id = cards_tags.card_id JOIN tags ON cards_tags.tag_id = tags.id WHERE cards.user_id = " + req.user.id + " AND tags.id IN " + tagsIdList + " GROUP BY cards.id;");
};

exports.selectAllUserTags = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('tag') + ") FROM tags WHERE user_id = " + req.user.id + ";");
};

exports.selectCard = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('card') + ") FROM cards WHERE id = " + req.card.id + " AND user_id = " + req.card.user_id + ";");
};

exports.selectCardTags = async (req) => {
  return await this.connect("SELECT JSON_OBJECT('id', tags.id, 'name', tags.name, 'user_id', tags.user_id) FROM tags JOIN cards_tags ON cards_tags.tag_id = tags.id JOIN cards ON cards.id = cards_tags.card_id WHERE cards.id = " + req.card.id + ";");
};

exports.selectCardsToRevise = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('card') + ") FROM cards WHERE user_id = " + req.user.id + " AND next_revision < NOW();");
};

exports.selectCardsToReviseByTagsAND = async (req) => {
  let tagsIdList = "(";
  for (let tag of req.tag) {
    tagsIdList += ` ${tag.id},`
  };
  tagsIdList = tagsIdList.replace(" ", "").slice(0, -1);
  tagsIdList += ")";

  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('card') + ") FROM cards JOIN cards_tags ON cards.id = cards_tags.card_id JOIN tags ON cards_tags.tag_id = tags.id WHERE cards.user_id = " + req.user.id + " AND next_revision < NOW() AND tags.id IN " + tagsIdList + " GROUP BY cards.id HAVING COUNT(DISTINCT tags.id) = " + req.tag.length + ";");
};

exports.selectCardsToReviseByTagsOR = async (req) => {
  let tagsIdList = "(";
  for (let tag of req.tag) {
    tagsIdList += ` ${tag.id},`
  };
  tagsIdList = tagsIdList.replace(" ", "").slice(0, -1);
  tagsIdList += ")";

  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('card') + ") FROM cards JOIN cards_tags ON cards.id = cards_tags.card_id JOIN tags ON cards_tags.tag_id = tags.id WHERE cards.user_id = " + req.user.id + " AND next_revision < NOW() AND tags.id IN " + tagsIdList + " GROUP BY cards.id;");
};

exports.selectLastCardCreated = async () => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('card') + ") FROM cards ORDER BY id DESC LIMIT 1;");
};

exports.selectLastTagCreated = async () => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('tag') + ") FROM tags ORDER BY id DESC LIMIT 1;");
};

exports.selectLastUserCard = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('card') + ") FROM cards WHERE user_id = " + req.user.id + " ORDER BY id DESC LIMIT 1;");
};

exports.selectTag = async (req) => {
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('tag') + ") FROM tags WHERE id = " + req.tag.id + ";");
};

exports.selectTagOrder = async (req) => {
  return await this.connect("SELECT JSON_OBJECT('card.id', cards_tags.card_id, 'card_order', cards_tags.card_order) FROM tags JOIN cards_tags ON cards_tags.tag_id = tags.id WHERE tags.id = " + req.tag.id + ";");
};

exports.updateCard = async (req) => {
  req.card.parseToMySQL();
  return await this.connect(this.updateRequest(req.card));
};

exports.updateCardOrder = async (req) => {
  return await this.connect(`UPDATE cards_tags SET card_order = ${req.assets.deck_order.order} WHERE card_id = ${req.card.id} AND tag_id = ${req.assets.tag_id};`);
};

exports.updateTag = async (req) => {
  req.tag.parseToMySQL();
  return await this.connect(this.updateRequest(req.tag));
};

exports.deleteCard = async (req) => {
  return await this.connect('DELETE FROM cards WHERE id = ' + req.card.id + ';');
};

exports.deleteCardTag = async (req) => {
  return await this.connect('DELETE FROM cards_tags WHERE card_id = ' + req.card.id + ' AND tag_id = ' + req.tag.id + ';');
};

exports.deleteTag = async (req) => {
  return await this.connect('DELETE FROM tags WHERE id = ' + req.tag.id + ';');
};

exports.createUser = async (req) => {
  req.user.parseToMySQL();
  await this.connect(this.insertRequest(req.user));
};

exports.selectUser = async (req) => {
  req.user.parseToMySQL();
  return await this.connect("SELECT JSON_OBJECT(" + this.jsonList('user') + ") FROM users WHERE pseudo = " + req.user.pseudo + ";");
};
