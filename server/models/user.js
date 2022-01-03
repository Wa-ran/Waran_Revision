const revisionObj = require('./revisionObj');
const bcrypt = require('bcrypt');

module.exports = class User extends revisionObj {

  constructor(id, pseudo, password) {
    super();
    this.id = this.tryParseInt(id);
    this.pseudo = pseudo;
    this.password = password;
    this.parseToJS();
  };

  parseToMySQL() {
    let pass = this.password;
    delete this.token;
    delete this.password;
    super.parseToMySQL();
    this['password'] = '"' + pass + '"';
    return this;
  };

  async cryptPassword() {
    return this.password = await bcrypt.hash(this.password, 10);
  };
};
