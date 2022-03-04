<template>
  <Options :btnText="'Options'" :optionsList="optionsList" />
</template>

<script>
export default {
  name: "OptionsAllCards",
  data() {
    return {
      optionsList: [
        {
          appKey: "allCardsShowCheck",
          desc: "Afficher les cartes à réviser",
        },
        {
          appKey: "allCardsDeckCheck",
          desc: "Transférer des cartes dans un autre deck",
        },
        {
          appKey: "allCardsDropCheck",
          desc: "Supprimer des cartes",
        },
      ],
    };
  },
  mounted() {
    if (this.sequence) this.mutateApp("allCardsShowCheck", true);
    else this.mutateApp("allCardsShowCheck", false);
  },
};
</script>
