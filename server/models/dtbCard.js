const revisionObj = require('./revisionObj');

module.exports = class DtbCard extends revisionObj {

  constructor(id, recto, verso, level, user_id, next_revision, reverse, comment, deck_id, recto_formula, verso_formula, recto_image, verso_image) {
    super();
    this.id = this.tryParseInt(id);
    this.recto = recto;
    this.verso = verso;
    this.level = this.tryParseInt(level);
    this.user_id = this.tryParseInt(user_id);
    this.next_revision = next_revision ? next_revision : new Date();
    this.comment = comment;
    this.deck_id = deck_id;
    this.recto_formula = this.isBoolean(recto_formula);
    this.verso_formula = this.isBoolean(verso_formula);
    this.recto_image = this.isBoolean(recto_image);
    this.verso_image = this.isBoolean(verso_image);
    this.reverse = this.isBoolean(reverse);
    this.parseToMySQL();
  };
}