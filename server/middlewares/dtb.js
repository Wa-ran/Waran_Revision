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
  let req = '(';
  for (let params of fctArgsNames(objName)) {
    req += `'${params}', ${params}, `
  }
  req = req.substring(0, req.length - 2);
  req += ')';

  return req;
};

const mysqlx = require('@mysql/xdevapi');
const config = {
  password: 'pass',
  // password: 'root',
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

exports.createCard = async (card) => {
  card.parseToMySQL();
  await this.connect(this.insertRequest(card));
};

exports.createCardTag = async (card, tag) => {
  card.parseToMySQL();
  tag.parseToMySQL();
  await this.connect('INSERT INTO cards_tags (card_id, tag_id) VALUES (' + card.id + ', ' + tag.id + ');');
};

exports.createTag = async (tag) => {
  tag.parseToMySQL();
  await this.connect(this.insertRequest(tag));
};

exports.selectAllUserCards = async (user) => {
  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('card') + " FROM cards WHERE user_id = " + user.id + ";");
};

exports.selectAllUserCardsByTagsAND = async (user, tags) => {
  let tagsIdList = "(";
  for (let tag of tags) {
    tagsIdList += ` ${tag.id},`
  };
  tagsIdList = tagsIdList.replace(" ", "").slice(0, -1);
  tagsIdList += ")";

  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('card') + " FROM cards JOIN cards_tags ON cards.id = cards_tags.card_id JOIN tags ON cards_tags.tag_id = tags.id WHERE cards.user_id = " + user.id + " AND tags.id IN " + tagsIdList + " GROUP BY cards.id HAVING COUNT(DISTINCT tags.id) = " + tags.length + ";");
};

exports.selectAllUserCardsByTagsOR = async (user, tags) => {
  let tagsIdList = "(";
  for (let tag of tags) {
    tagsIdList += ` ${tag.id},`
  };
  tagsIdList = tagsIdList.replace(" ", "").slice(0, -1);
  tagsIdList += ")";

  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('card') + " FROM cards JOIN cards_tags ON cards.id = cards_tags.card_id JOIN tags ON cards_tags.tag_id = tags.id WHERE cards.user_id = " + user.id + " AND tags.id IN " + tagsIdList + " GROUP BY cards.id;");
};

exports.selectAllUserTags = async (user) => {
  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('tag') + " FROM tags WHERE user_id = " + user.id + ";");
};

exports.selectCard = async (card) => {
  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('card') + " FROM cards WHERE id = " + card.id + " AND user_id = " + card.user_id + ";");
};

exports.selectCardTags = async (card) => {
  return await this.connect("SELECT JSON_OBJECT('id', tags.id, 'name', tags.name, 'user_id', tags.user_id) FROM tags JOIN cards_tags ON cards_tags.tag_id = tags.id JOIN cards ON cards.id = cards_tags.card_id WHERE cards.id = " + card.id + ";");
};

exports.selectCardsToRevise = async (user) => {
  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('card') + " FROM cards WHERE user_id = " + user.id + " AND next_revision < NOW();");
};

exports.selectCardsToReviseByTagsAND = async (user, tags) => {
  let tagsIdList = "(";
  for (let tag of tags) {
    tagsIdList += ` ${tag.id},`
  };
  tagsIdList = tagsIdList.replace(" ", "").slice(0, -1);
  tagsIdList += ")";

  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('card') + " FROM cards JOIN cards_tags ON cards.id = cards_tags.card_id JOIN tags ON cards_tags.tag_id = tags.id WHERE cards.user_id = " + user.id + " AND next_revision < NOW() AND tags.id IN " + tagsIdList + " GROUP BY cards.id HAVING COUNT(DISTINCT tags.id) = " + tags.length + ";");
};


exports.selectCardsToReviseByTagsOR = async (user, tags) => {
  let tagsIdList = "(";
  for (let tag of tags) {
    tagsIdList += ` ${tag.id},`
  };
  tagsIdList = tagsIdList.replace(" ", "").slice(0, -1);
  tagsIdList += ")";

  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('card') + " FROM cards JOIN cards_tags ON cards.id = cards_tags.card_id JOIN tags ON cards_tags.tag_id = tags.id WHERE cards.user_id = " + user.id + " AND next_revision < NOW() AND tags.id IN " + tagsIdList + " GROUP BY cards.id;");
};

exports.selectLastCardCreated = async () => {
  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('card') + " FROM cards ORDER BY id DESC LIMIT 1;");
};

exports.selectLastTagCreated = async () => {
  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('tag') + " FROM tags ORDER BY id DESC LIMIT 1;");
};

exports.selectLastUserCard = async (user) => {
  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('card') + " FROM cards WHERE user_id = " + user.id + " ORDER BY id DESC LIMIT 1;");
};

exports.selectTag = async (tag) => {
  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('tag') + " FROM tags WHERE id = " + tag.id + ";");
};

exports.updateCard = async (card) => {
  card.parseToMySQL();
  return await this.connect(this.updateRequest(card));
};

exports.updateTag = async (tag) => {
  tag.parseToMySQL();
  return await this.connect(this.updateRequest(tag));
};

exports.deleteCard = async (card) => {
  return await this.connect('DELETE FROM cards WHERE id = ' + card.id + ';');
};

exports.deleteCardTag = async (card, tag) => {
  return await this.connect('DELETE FROM cards_tags WHERE card_id = ' + card.id + ' AND tag_id = ' + tag.id + ';');
};

exports.deleteTag = async (tag) => {
  return await this.connect('DELETE FROM tags WHERE id = ' + tag.id + ';');
};

exports.createUser = async (user) => {
  user.parseToMySQL();
  await this.connect(this.insertRequest(user));
};

exports.selectUser = async (user) => {
  return await this.connect("SELECT JSON_OBJECT" + this.jsonList('user') + " FROM users WHERE id = " + user.id + ";");
};
