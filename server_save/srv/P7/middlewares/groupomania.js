const mysqlx = require('@mysql/xdevapi');
const config = {
  password: 'root',
  user: 'root',
  host: 'localhost',
  schema: 'groupomania'
};

exports.connect = mysqlx.getSession(config)
.then(function (s) {
  session = s;
  return session.sql('USE groupomania').execute();
})
.catch((err) => {
  console.log(err)
  throw 'La connexion à la BDR a échouée !'
});

exports.call = async function(proc, ...args) {
  let row = [];

  let list = '';
  args.forEach(arg => {
    if ((arg === undefined) || (arg === '')) {
      console.log(args)
      this.errorHandler(new Error, 'Veuillez remplir tous les champs.')
    }

    let el = "\'" + arg + "\',";
    list = list + el;
  });
  list = list.slice(0, list.length - 1); // Pour enlever la dernière ','

  await this.connect
  .then(() => {
    return session.sql('CALL ' + proc + '(' + list + ');')
    .execute((res) => { row.push(res[0]) })
  })
  .catch((error) => {
    this.errorHandler(error)
  })
  return row
};

exports.errorHandler = function(error, msg) {
  let custMsg;
  console.log(error);
  if (msg) {
    custMsg = msg
  } else {
    custMsg = "Erreur lors de la procédure."
  }
  try {
    if (error.info.code === 9999) {
      custMsg = error.info.msg
    }
  } catch (error) {
    throw { custMsg }
  }
  throw { custMsg }
}

exports.keepRunning = function() {
  setInterval(async () => {
    await this.connect
  }, 1000 * 60 * 60);
}