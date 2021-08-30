const mysqlx = require('@mysql/xdevapi');
const config = {
  password: 'root',
  user: 'root',
  host: 'localhost',
  schema: 'waran_revision',
};

exports.connect = async (fctRequest) => {
  let result;
  await mysqlx.getSession(config)
    .catch((err) => {
      console.log(err)
      throw 'La connexion à la BDR a échouée !'
    })
    .then(session => {
      return session.startTransaction()
        .then((session) => {
          result = session.sql(fctRequest).execute()

          return result
        })
        .then((res) => {
          session.commit();
          return res
        })
        .catch(err => {
          session.rollback()
          console.log(err)
          throw 'Rollback...'
        })
    })
    .then((res) => {
      session.close();
      return res
    })
    .catch((err) => {
      console.log(err)
      throw 'Problème avec la BDR.'
    });
};

exports.selectAllUserCards = async (user_id) => {
  await dtb.connect('SELECT * FROM cards WHERE user_id = ' + user_id + ';')
};

exports.fetchCardTags = async (session, card_id) => {
  return session.sql('SELECT * FROM tags JOIN cards_tags ON tags_id WHERE cards_tags.card_id = ' + card_id + ';')
    .execute()
};

exports.fetchCardRevision = async (session, card_id) => {
  return session.sql('SELECT * FROM revisions WHERE card_id = ' + card_id + ';')
    .execute()
};
