const revisionObj = require('./revisionObj');

const HOURS_SUITE = {
  0: 0,
  1: 2,
  2: 6,
  3: 12,
  4: 12,
  5: 21,
  6: 21,
  7: 36,
  8: 36,
  9: 60,
  10: 60,
  11: 96,
  12: 96,
  13: 156,
  14: 156,
  15: 252,
  16: 252,
  17: 408,
  18: 408,
  19: 660,
  20: 660,
  21: 1068,
  22: 1068,
  23: 1728,
  24: 1728,
  25: 2796,
  26: 2796,
  27: 4524,
  28: 4524,
  29: 7320,
  30: 7320
};

module.exports = class DtbCard extends revisionObj {

  constructor(id, recto, verso, streak, user_id, next_revision, reverse, comment, deck_id, recto_formula, verso_formula, recto_image, verso_image) {
    super();
    this.id = this.tryParseInt(id);
    this.recto = recto;
    this.verso = verso;
    this.streak = this.tryParseInt(streak);
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

  calculNextRevision() {
    let streak = this.streak;
    if (streak > Object.values(HOURS_SUITE).length) streak = Object.values(HOURS_SUITE).length;
    let number = HOURS_SUITE[streak];
    this.next_revision = new Date(new Date().setTime(new Date().getTime() + number * 60 * 60 * 1000));
  };

  inverseRectoVerso() {
    if (this.reverse) {
      let recto = this.recto;
      this.recto = this.verso;
      this.verso = recto;
    }
  };
}