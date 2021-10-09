const dtbObj = require('./dtbObj');
const bcrypt = require('bcrypt');

module.exports = class User extends dtbObj {

  constructor(id, pseudo, password) {
    super();
    this.id = this.tryParseInt(id);
    this.pseudo = pseudo;
    this.password = password;
  };

  parseToJS() {
    let token = this.token;
    delete this.token;
    delete this.password;
    super.parseToJS();
    this['token'] = token;
    return this;
  };

  parseToMySQL() {
    super.parseToMySQL();
    if (this.token) delete this.token;
    return this;
  };

  async cryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  };
};
