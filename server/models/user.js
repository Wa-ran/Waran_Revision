const dtbObj = require('./dtbObj');

module.exports = class User extends dtbObj {

  constructor(id, pseudo) {
    super();
    this.id = this.tryParseInt(id);
    this.pseudo = pseudo;
  };
}