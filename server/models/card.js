const revisionObj = require('./revisionObj');
const dateParser = require('../middlewares/dateParser')

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

module.exports = class Card extends revisionObj {

  constructor(id, recto, verso, level, user_id, next_revision, reverse, comment, deck_id, recto_formula, verso_formula, recto_image, verso_image, win, decalage, suggestion_down, suggestion_up) {
    super();
    this.id = this.tryParseInt(id);
    this.recto = recto;
    this.verso = verso;
    this.level = this.tryParseInt(level);
    this.user_id = this.tryParseInt(user_id);
    this.next_revision = next_revision ? dateParser.toJS(next_revision) : new Date();
    this.comment = comment;
    this.deck_id = deck_id;
    this.recto_formula = this.isBoolean(recto_formula);
    this.verso_formula = this.isBoolean(verso_formula);
    this.recto_image = this.isBoolean(recto_image);
    this.verso_image = this.isBoolean(verso_image);
    this.reverse = this.isBoolean(reverse);
    this.win = this.isBoolean(win);
    this.decalage = decalage ? this.tryParseInt(decalage) : this.calculDecalage();
    this.suggestion_down = suggestion_down ? this.tryParseInt(suggestion_down) : this.suggestDownLevel();
    this.suggestion_up = suggestion_up ? this.tryParseInt(suggestion_up) : this.suggestUpLevel();
    this.parseToJS();
  };

  newLevel() {
    let newLevel;
    if (win) newLevel = this.level++;
    if (!win && newLevel % 2 === 0) newLevel--;
    if (newLevel < 0) newLevel = 0;
    this.level = newLevel
  }

  calculNextRevision() {
    if (level > HOURS_SUITE.length) level = HOURS_SUITE.length;
    let hours = HOURS_SUITE[level];
    if (level > 8) {
      let decal = Math.trunc(hours / 10);
      let rand = Math.random();
      if (rand < 1 / 3) hours += decal;
      else if (rand > 2 / 3) hours -= decal;
    }
    this.next_revision = new Date(
      new Date().setTime(new Date().getTime() + hours * 60 * 60 * 1000)
    );
  };

  inverseRectoVerso() {
    if (this.reverse) {
      let recto = this.recto;
      this.recto = this.verso;
      this.verso = recto;
    }
  };

  calculDecalage() {
    const diffTime = Math.abs(new Date() - this.next_revision);
    return Math.ceil(diffTime / (1000 * 60 * 60));
  }

  suggestDownLevel() {
    let suggestion = null;
    if (this.decalage > 24) {
      suggestion = this.level - 1;
      let level_hours = this.decalage;
      do {
        level_hours -= HOURS_SUITE[suggestion];
        suggestion--;
      } while (level_hours >= 0 && suggestion > 0);
    }
    return suggestion;
  }
  suggestUpLevel() {
    let suggestion = null;
    if (this.decalage > 24) {
      let level_up = this.decalage + HOURS_SUITE[this.level];
      for (let [key, value] of Object.entries(HOURS_SUITE)) {
        if (value > level_up) {
          suggestion = key - 2;
          break;
        }
      }
    }
    return suggestion;
  }
}