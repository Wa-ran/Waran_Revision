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

  constructor(id, recto, verso, level, user_id, next_revision, reverse, comment, deck_id, recto_formula, verso_formula, recto_image, verso_image, win, decalage, adapt_level_down, adapt_level_up, adapt_level_accepted) {
    super();
    this.id = this.tryParseInt(id);
    this.recto = recto;
    this.verso = verso;
    this.level = this.tryParseInt(level);
    this.user_id = this.tryParseInt(user_id);
    this.next_revision = next_revision ? dateParser.toJS(next_revision) : new Date();
    this.comment = comment;
    this.deck_id = this.tryParseInt(deck_id);
    this.recto_formula = this.isBoolean(recto_formula);
    this.verso_formula = this.isBoolean(verso_formula);
    this.recto_image = recto_image;
    this.verso_image = verso_image;
    this.reverse = this.isBoolean(reverse);
    this.win = this.isBoolean(win, true);
    this.decalage = decalage ? this.tryParseInt(decalage) : this.calculDecalage();
    this.adapt_level_down = adapt_level_down ? this.tryParseInt(adapt_level_down) : this.suggestDownLevel();
    this.adapt_level_up = adapt_level_up ? this.tryParseInt(adapt_level_up) : this.suggestUpLevel();
    this.adapt_level_refused = this.isBoolean(adapt_level_accepted);
    this.parseToJS();
  };

  newLevel() {
    let newLevel = this.level;
    if (this.win !== null) {
      if (this.decalage < 24 || this.adapt_level_refused) {
        if (this.win) newLevel++;
        if (!this.win) newLevel -= 2;
      }
      else {
        if (this.win) newLevel = this.adapt_level_up
        if (!this.win) newLevel = this.adapt_level_down
      }
    }
    if (newLevel % 2 === 0 && !this.win) newLevel--;
    if (newLevel < 0) newLevel = 0;
    this.level = newLevel
  }

  calculNextRevision() {
    if (this.level > HOURS_SUITE.length) this.level = HOURS_SUITE.length;
    let hours = HOURS_SUITE[this.level];
    if (this.level > 6) {
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
      recto = this.recto_image;
      this.recto_image = this.verso_image;
      this.verso_image = recto;
      recto = this.recto_formula;
      this.recto_formula = this.verso_formula;
      this.verso_formula = recto;
    }
  };

  updateCard() {
    this.newLevel();
    this.calculNextRevision();
    this.inverseRectoVerso();
  };

  calculDecalage() {
    const diffTime = Math.abs(new Date() - this.next_revision);
    return Math.ceil(diffTime / (1000 * 60 * 60));
  };

  suggestDownLevel() {
    let adapt_level = this.level - 1;
    if (this.decalage > 24) {
      adapt_level = this.level - 1;
      let level_hours = this.decalage;
      do {
        level_hours -= HOURS_SUITE[adapt_level];
        adapt_level--;
      } while (level_hours >= 0 && adapt_level > 0);
    }
    if (adapt_level % 2 === 0) adapt_level--;
    if (adapt_level < 0) adapt_level = 0;
    return adapt_level;
  };

  suggestUpLevel() {
    let adapt_level = this.level + 1;
    if (this.decalage > 24) {
      let level_up = this.decalage + HOURS_SUITE[this.level];
      for (let [key, value] of Object.entries(HOURS_SUITE)) {
        if (value > level_up) {
          adapt_level = key - 2;
          break;
        }
      }
    }
    if (adapt_level === this.level) adapt_level++;
    return adapt_level;
  };
}