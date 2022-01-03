const revisionObj = require('./revisionObj');

module.exports = class Deck extends revisionObj {

  constructor(id, user_id, title, text, cards_total_number, cards_to_revise, sequence) {
    super();
    this.id = this.tryParseInt(id);
    this.user_id = this.tryParseInt(user_id);
    this.title = title;
    this.text = text;
    this.cards_total_number = this.tryParseInt(cards_total_number);
    this.cards_to_revise = this.tryParseInt(cards_to_revise);
    this.sequence = this.isBoolean(sequence);
    this.parseToJS();
  };
}