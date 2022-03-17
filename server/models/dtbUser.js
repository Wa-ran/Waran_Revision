const revisionObj = require('./revisionObj');
const bcrypt = require('bcrypt');

module.exports = class DtbUser extends revisionObj {

  constructor(id, pseudo, password, hide_card, chrono_card, fast_mode, dark_mode, hide_form_modal) {
    super();
    this.id = this.tryParseInt(id);
    this.pseudo = pseudo;
    this.password = password;
    this.hide_card = this.isBoolean(hide_card);
    this.chrono_card = this.isBoolean(chrono_card);
    this.fast_mode = this.isBoolean(fast_mode);
    this.dark_mode = this.isBoolean(dark_mode, true);
    this.hide_form_modal = this.isBoolean(hide_form_modal);
    this.parseToMySQL();
  };

  parseToMySQL() {
    let pass = this.password;
    delete this.token;
    delete this.password;
    super.parseToMySQL();
    this['password'] = '"' + pass + '"';
    return this;
  };
};
