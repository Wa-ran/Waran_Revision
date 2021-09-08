const dtb = require('../middlewares/dtb');
const dateParser = require('../middlewares/dateParser');
const { encrypt, decrypt } = require('../middlewares/crypto');

const HOURS_SUITE = {
  0: 0,
  1: 8,
  2: 12,
  3: 24,
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

module.exports = class Card {

  constructor(id, recto, verso, streak, user_id, next_revision, required_cards, tags) {
    this.id = this.tryParseInt(id);
    this.recto = recto;
    this.verso = verso;
    this.streak = this.tryParseInt(streak);
    this.user_id = this.tryParseInt(user_id);
    this.next_revision = next_revision ? next_revision : new Date();
    this.required_cards = this.tryJoin(required_cards);
    this.tags = this.tryJoin(tags);
  };

  parseToJS() {
    for (let [key, value] of Object.entries(this)) {
      try {
        if (!Number.isInteger(value) && key != "next_revision") {
          this[key] = decrypt(value)
        };
      }
      catch (error) {
        console.log([key, value])
        throw error
      };
    };
    this.next_revision = dateParser.toJS(this.next_revision);
    return this
  };

  parseToMySQL() {
    // not null, string = encryption
    for (let [key, value] of Object.entries(this)) {
      try {
        if (value === null) {
          this[key] = '""'
        }
        else if (!Number.isInteger(value) && key != "next_revision") {
          this[key] = `"${encrypt(value)}"`
        };
      }
      catch (error) {
        console.log([key, value])
        throw error
      };
    };
    this.next_revision = `"${dateParser.toMySQL(this.next_revision)}"`;
    return this
  };

  tryJoin(array) {
    try {
      return array.join();
    } catch (error) {
      return null;
    };
  };

  tryParseInt(val) {
    return Number.isInteger(val) ? val : (isNaN(Number.parseInt(val)) ? null : Number.parseInt(val));
  };

  calculNextRevision() {
    let streak = this.streak;
    if (streak > Object.values(HOURS_SUITE).length) streak = Object.values(HOURS_SUITE).length;
    let number = HOURS_SUITE[streak];
    this.next_revision = new Date(new Date().setTime(new Date().getTime() + number * 60 * 60 * 1000));
  };

  inverseRectoVerso() {
    let recto = this.recto;
    this.recto = this.verso;
    this.verso = recto;
  };

  async updateFromDtb() {
    let dtbCard = await dtb.SelectCard(this);
    for (let [key, value] of Object.entries(this)) {
      this[key] = dtbCard[key]
    };
  };
}