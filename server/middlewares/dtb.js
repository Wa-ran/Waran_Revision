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

exports.createCard = async (card) => {
  card.parseToMySQL();
  let newCard;
  await this.connect('INSERT INTO cards (recto, verso, streak, next_revision, user_id, required_cards, reverse) VALUES (' + card.recto + ', ' + card.verso + ', ' + card.streak + ', ' + card.next_revision + ', ' + card.user_id + ', ' + card.required_cards + ', ' + card.reverse + ');')
    .then(async () => { newCard = await this.selectLastCardCreated() })
  return newCard
};

exports.createCardTag = async (card, tag) => {
  card.parseToMySQL();
  tag.parseToMySQL();
  await this.connect('INSERT INTO cards_tags (card_id, tag_id) VALUES (' + card.id + ', ' + tag.id + ');');
};

exports.createTag = async (tag) => {
  tag.parseToMySQL();
  let newTag;
  await this.connect('INSERT INTO tags (name, user_id) VALUES (' + tag.name + ', ' + tag.user_id + ');')
    .then(async () => { newTag = await this.selectLastTagCreated() })
  return newTag
};

exports.deleteCard = async (card) => {
  return await this.connect('DELETE FROM cards WHERE id = ' + card.id + ';');
};

exports.deleteTag = async (tag) => {
  return await this.connect('DELETE FROM tags WHERE id = ' + tag.id + ';');
};

exports.selectAllUserCards = async (user) => {
  return await this.connect("SELECT JSON_OBJECT('id', id, 'recto', recto, 'verso', verso, 'streak', streak, 'next_revision', next_revision, 'user_id', user_id, 'required_cards', required_cards, 'reverse', reverse) FROM cards WHERE user_id = " + user.id + ";");
};

exports.selectAllUserCardsByTags = async (user, tags) => {
  let tagsIdList = "(";
  for (let tag of tags) {
    tagsIdList += ` ${tag.id},`
  }
  if (tags.length > 0) tagsIdList.replace(" ", "").slice(0, -1)
  tagsIdList += ")";

  return await this.connect("SELECT JSON_OBJECT('id', id, 'recto', recto, 'verso', verso, 'streak', streak, 'next_revision', next_revision, 'user_id', user_id, 'required_cards', required_cards, 'reverse', reverse) FROM cards JOIN cards_tags ON cards.id JOIN tags ON cards_tags.tags_id WHERE cards.user_id = " + user.id + " AND tags.id IN " + tagsIdList + ";");
};

exports.selectAllUserTags = async (user) => {
  return await this.connect("SELECT JSON_OBJECT('id', id, 'name', name, 'user_id', user_id) FROM tags WHERE user_id = " + user.id + ";");
};

exports.selectCard = async (card) => {
  return await this.connect("SELECT JSON_OBJECT('id', id, 'recto', recto, 'verso', verso, 'streak', streak, 'next_revision', next_revision, 'user_id', user_id, 'required_cards', required_cards, 'reverse', reverse) FROM cards WHERE id = " + card.id + " AND user_id = " + card.user_id + ";");
};

exports.selectCardTags = async (card) => {
  return await this.connect("SELECT JSON_OBJECT('id', tags.id, 'name', tags.name, 'user_id', tags.user_id) FROM tags JOIN cards_tags ON cards_tags.tag_id = tags.id JOIN cards ON cards.id = " + card.id + ";");
};

exports.selectCardsToRevise = async (user) => {
  return await this.connect("SELECT JSON_OBJECT('id', id, 'recto', recto, 'verso', verso, 'streak', streak, 'next_revision', next_revision, 'user_id', user_id, 'required_cards', required_cards, 'reverse', reverse) FROM cards WHERE user_id = " + user.id + " AND next_revision < NOW();");
};

exports.selectLastCardCreated = async () => {
  return await this.connect("SELECT JSON_OBJECT('id', id, 'recto', recto, 'verso', verso, 'streak', streak, 'next_revision', next_revision, 'user_id', user_id, 'required_cards', required_cards, 'reverse', reverse) FROM cards ORDER BY id DESC LIMIT 1;");
};

exports.selectLastTagCreated = async () => {
  return await this.connect("SELECT JSON_OBJECT('id', id, 'name', name, 'user_id', user_id) FROM tags ORDER BY id DESC LIMIT 1;");
};

exports.selectLastUserCard = async (user) => {
  return await this.connect("SELECT JSON_OBJECT('id', id, 'recto', recto, 'verso', verso, 'streak', streak, 'next_revision', next_revision, 'user_id', user_id, 'required_cards', required_cards, 'reverse', reverse) FROM cards WHERE user_id = " + user.id + " ORDER BY id DESC LIMIT 1;");
};

exports.selectTag = async (tag) => {
  return await this.connect("SELECT JSON_OBJECT('id', id, 'name', name, 'user_id', user_id) FROM tags WHERE id = " + tag.id + ";");
};

exports.updateCard = async (card) => {
  card.parseToMySQL();
  return await this.connect('UPDATE cards SET recto = ' + card.recto + ', verso = ' + card.verso + ', streak = ' + card.streak + ', next_revision = ' + card.next_revision + ', required_cards = ' + card.required_cards + ', reverse = ' + card.reverse + ' WHERE id = ' + card.id + ';');
};

exports.updateTag = async (tag) => {
  tag.parseToMySQL();
  return await this.connect('UPDATE tags SET name = ' + tag.name + ' WHERE id = ' + tag.id + ';');
};

