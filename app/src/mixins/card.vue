<script>
export default {
  name: "card",
  data() {
    return {
      hours: {
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
        30: 7320,
      },
    };
  },
  methods: {
    mixShowDeck(card) {
      for (let deck of this.$store.state.decksList) {
        if (deck.id == card.deck_id) return deck.title;
      }
    },
    mixShowLevel(card) {
      let level = Math.trunc(card.level / 2);
      if (card.level % 2 === 1) level++;
      else if (level !== 0) level += "+";
      return level;
    },
    mixShowRevision(card) {
      let next = new Date(
        new Date().setTime(
          new Date().getTime() + this.hours[card.level] * 60 * 60 * 1000
        )
      );
      let showDate = new Date(next - Date.now());
      if (showDate.getTime() / 3600000 < 48)
        return "toutes les " + Math.round(showDate / 3600000) + " heures.";
      else if (
        showDate.getTime() / 3600000 > 48 &&
        showDate.getTime() / (3600000 * 24) < 14
      )
        return "tous les " + Math.round(showDate / (3600000 * 24)) + " jours.";
      else return "d'ici le " + next.getDate() + "/" + (1 + next.getMonth());
    },
  },
};
</script>
