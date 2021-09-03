const dtb = require('../middlewares/dtb');
const dateParser = require('../middlewares/dateParser');

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
    try {
      this.next_revision = dateParser.toJS(this.next_revision);
    } catch (error) {
      // If error or already to JS
      console.log(error);
      return this
    };
    for (let [key, value] of Object.entries(this)) {
      try {
        if (value === '""' || value === null) {
          this[key] = null
        }
        else if (!Number.isInteger(value) && value[0] == '"' && value[value.length] == '"') {
          this[key] = value.substring(1, value.length - 1)
        };
      }
      catch (error) {
        console.log([key, value])
        throw error
      };
    };
    return this
  };

  parseToMySQL() {
    // not null, string = "string"
    try {
      this.next_revision = dateParser.toMySQL(this.next_revision);
    } catch (error) {
      // If error or already to MySQL
      console.log(error);
      return this
    };
    for (let [key, value] of Object.entries(this)) {
      try {
        if (value === null) {
          this[key] = '""'
        }
        else if (!Number.isInteger(value) && value[0] != '"' && value[value.length] != '"') {
          this[key] = '"' + value + '"'
        };
      }
      catch (error) {
        console.log([key, value])
        throw error
      };
    };
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

  newStreak(win) {
    if (win) {
      ++this.streak;
    }
    else {
      --this.streak;
    };
  };

  calculNextRevision() {
    let number = HOURS_SUITE[this.streak];
    this.next_revision = new Date(new Date().setTime(new Date().getTime() + number * 60 * 60 * 1000));
  };

  async updateFromDtb() {
    let dtbCard = await dtb.SelectCard(this);
    for (let [key, value] of Object.entries(this)) {
      this[key] = dtbCard[key]
    };
  };
}