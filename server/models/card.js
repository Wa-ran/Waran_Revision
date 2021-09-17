const dtbObj = require('./dtbObj');

const HOURS_SUITE = {
  0: 0,
  1: 6,
  2: 12,
  3: 22,
  4: 36,
  5: 60,
  6: 96,
  7: 156,
  8: 252,
  9: 408,
  10: 660,
  11: 1068,
  12: 1728,
  13: 2796,
  14: 4524,
  15: 7320
};

module.exports = class Card extends dtbObj {

  constructor(id, recto, verso, streak, user_id, next_revision, required_cards, reverse, tags) {
    super();
    this.id = this.tryParseInt(id);
    this.recto = recto;
    this.verso = verso;
    this.streak = this.tryParseInt(streak);
    this.user_id = this.tryParseInt(user_id);
    this.next_revision = next_revision ? next_revision : new Date();
    this.required_cards = this.tryJoin(required_cards);
    this.reverse = reverse;
    this.tags = this.tryJoin(tags);
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