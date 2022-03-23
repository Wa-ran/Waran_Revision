const dtbObj = require('./dtbObj');

module.exports = class Tag extends dtbObj {

  constructor(id, name, user_id) {
    super();
    this.id = this.tryParseInt(id);
    this.name = name;
    this.user_id = this.tryParseInt(user_id);
  };
}