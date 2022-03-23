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
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
  },
  methods: {
    async mixNewDeck(card) {
      if (!card.deck_id || card.deck_id === "new") {
        let deckId;
        if (
          this.$store.state.decksList[this.$store.state.decksList.length - 1]
            .title !== "Nouveau deck"
        ) {
          await this.$store
            .dispatch("postDeck", {
              title: "Nouveau deck",
              user_id: this.$store.state.user.id,
            })
            .then(() => {
              return this.$store.dispatch("getLastUserDeck");
            })
            .then(() => {
              return (deckId = this.$store.state.actualDeck.id);
            });
        }
        return deckId;
      } else return;
    },
    mixShowDeck(card) {
      for (let deck of this.$store.state.decksList) {
        if (deck.id == card.deck_id) return deck.title;
      }
    },
    mixShowLevel(cardLevel) {
      let level = Math.trunc(cardLevel / 2);
      if (cardLevel % 2 === 1) level++;
      else if (level !== 0) level += "+";
      return level;
    },
    mixShowRevision(card) {
      if (card.level === 0 || card.level === null) return "dès que possible.";
      let next = new Date(
        new Date().setTime(
          new Date().getTime() + this.hours[card.level] * 60 * 60 * 1000
        )
      );
      let showDate = new Date(next - Date.now());
      if (showDate.getTime() / 3600000 < 48)
        return "~ toutes les " + Math.round(showDate / 3600000) + " heures.";
      else if (
        showDate.getTime() / 3600000 > 48 &&
        showDate.getTime() / (3600000 * 24) < 14
      )
        return (
          "~ tous les " + Math.round(showDate / (3600000 * 24)) + " jours."
        );
      else return "d'ici le " + next.getDate() + "/" + (1 + next.getMonth());
    },
    async mixHandleSubmit(card) {
      await this.mixNewDeck(card)
        .then((res) => {
          if (res) card.deck_id = res;
          this.mutateKey("actualCard", { ...card });
          return this.$store.dispatch("submitCard");
        })
        .then(() => {
          if (!this.actualCard.id) {
            return this.$store.dispatch("getLastUserCard");
          } else if (
            this.actualCard.level === 0 ||
            (!this.actualCard.win && this.actualCard.adapt_level_down === 0)
          ) {
            return this.$store.dispatch("reserveCard", {
              list: "cardsToReviseBaseList",
              item: this.actualCard,
            });
          } else {
            return this.$store.dispatch("mutateStore", {
              fct: "removeListItem",
              value: { list: "cardsToReviseBaseList", item: this.actualCard },
            });
          }
        })
        .then(() => {
          if (this.$store.state.filesInputs.length > 0) {
            return this.$store.dispatch("getCard").then(() => {
              return this.$store.dispatch("postImg");
            });
          } else return;
        });
    },
  },
};
</script>
