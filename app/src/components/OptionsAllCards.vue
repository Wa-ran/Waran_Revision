<template>
  <Options :btnText="'Options'" :optionsList="optionsList" />
</template>

<script>
import card from "@/mixins/card";

export default {
  name: "OptionsAllCards",
  computed: {
    allCardsDeckCheck() {
      return this.$store.state.app.allCardsDeckCheck;
    },
    allCardsDropCheck() {
      return this.$store.state.app.allCardsDropCheck;
    },
    optionsList() {
      return [
        this.$store.getters.actualDeck.sequence
          ? ""
          : {
              appKey: "allCardsShowCheck",
              desc: "Afficher les cartes à réviser",
            },
        {
          appKey: "allCardsDeckCheck",
          desc: this.allCardsDeckCheck
            ? "Sélectionnez des cartes"
            : "Transférer des cartes dans un autre deck",
        },
        {
          appKey: "allCardsDropCheck",
          desc: this.allCardsDropCheck
            ? "Sélectionnez des cartes"
            : "Supprimer des cartes",
        },
      ];
    },
  },
  mounted() {
    this.mutateApp("allCardsShowCheck", false);
  },
  mixins: [card],
};
</script>
