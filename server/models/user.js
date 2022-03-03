const revisionObj = require('./revisionObj');
const bcrypt = require('bcrypt');

module.exports = class User extends revisionObj {

  constructor(id, pseudo, password, hide_card, chrono_card, fast_mode, dark_mode) {
    super();
    this.id = this.tryParseInt(id);
    this.pseudo = pseudo;
    this.password = password;
    this.hide_card = this.isBoolean(hide_card);
    this.chrono_card = this.isBoolean(chrono_card);
    this.fast_mode = this.isBoolean(fast_mode);
    this.dark_mode = this.isBoolean(dark_mode, true);
    this.parseToJS();
  };

  parseToJS() {
    let pass = this.password;
    let token = this.token;
    super.parseToJS();
    this['token'] = token;
    this['password'] = pass;
    return this;
  };

  beforeSend() {
    delete this.password;
    super.beforeSend();
    return this;
  };

  async cryptPassword() {
    return this.password = await bcrypt.hash(this.password, 10);
  };
};
