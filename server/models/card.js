const dtb = require('../middlewares/dtb');

const HOURS_SUITE = {
  0: 8,
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

  constructor(card_id, recto, verso, streak, user_id, next_revision = new Date().getTime(), required_cards = [], tags) {
    this.card_id = Number.parseInt(card_id);
    this.recto = recto;
    this.verso = verso;
    this.streak = Number.parseInt(streak);
    this.user_id = Number.parseInt(user_id);
    this.next_revision = next_revision;
    this.required_cards = required_cards;
    this.tags = tags;
  };

  newStreak(win) {
    if (win) {
      ++this.streak
    }
    else {
      --this.streak
    }
  };

  calculNextRevision() {
    let number = HOURS_SUITE[this.streak];
    return new Date().getTime() + number * hours
  };


  dtbSelectCard = async () => {
    await dtb.connect('SELECT * FROM cards WHERE id = ' + this.card_id + ';')
  };

  dtbCreateCard = () => {
    dtb.connect('INSERT INTO cards (recto, verso, streak, next_revision, user_id, required_cards) values(' + this.recto + ', ' + this.verso + ', ' + this.streak + ', now(), ' + this.user_id + ', ' + this.required_cards + ');')
  };

  dtbUpdateCard = () => {
    dtb.connect('UPDATE cards SET recto = ' + this.recto + ', verso = ' + this.verso + ', streak = ' + this.streak + ', next_revision = ' + this.next_revision + ', required_cards = ' + this.required_cards + ' WHERE id = ' + this.card_id + ';')
  };

  dtbDeleteCard = () => {
    dtb.connect('DELETE FROM cards WHERE id = ' + this.card_id + ';')
  };
}