const revisionObj = require('./revisionObj');

module.exports = class DtbDeck extends revisionObj {

  constructor(id, user_id, title, text, sequence) {
    super();
    this.id = this.tryParseInt(id);
    this.user_id = this.tryParseInt(user_id);
    this.title = title;
    this.text = text;
    this.sequence = this.isBoolean(sequence);
    this.parseToMySQL();
  };
}