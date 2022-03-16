const revisionObj = require('./revisionObj');

module.exports = class Deck extends revisionObj {

  constructor(id, user_id, title, text, cards_total_number, cards_to_revise, sequence, sequence_list, min_level) {
    super();
    this.id = this.tryParseInt(id);
    this.user_id = this.tryParseInt(user_id);
    this.title = title;
    this.text = text;
    this.cards_total_number = this.tryParseInt(cards_total_number);
    this.cards_to_revise = this.tryParseInt(cards_to_revise);
    this.sequence = this.isBoolean(sequence);
    this.sequence_list = sequence_list;
    this.min_level = this.tryParseInt(min_level);
    this.parseToJS();
  };
}