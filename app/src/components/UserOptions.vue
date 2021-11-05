<template>
  <div class="container">
    <h3>Options de révisions:</h3>
    <CheckButton
      @check="mutateKey('cardChrono', $event)"
      :desc="'Chronomètre'"
      :preChecked="cardChronoState"
      :key="cardChronoState"
    />
    <CheckButton
      @check="pickRandom($event)"
      :desc="'Mélange du paquet'"
      :preChecked="pickRandomState"
      :key="pickRandomState"
    />
  </div>
</template>

<script>
import CheckButton from "@/components/CheckButton.vue";

export default {
  name: "UserOptions",
  components: {
    CheckButton,
  },
  computed: {
    cardChronoState() {
      return this.$store.state.cardChrono;
    },
    pickRandomState() {
      return this.$store.state.pickRandom;
    },
    orderedCardsList() {
      return this.$store.state.orderedCardsList;
    },
  },
  methods: {
    pickRandom(event) {
      this.mutateKey("reviseByOrder", !event);
      // if (!event) {
      //   if (this.$store.state.tagsSelectedList.length > 0) {
      //     this.$store.dispatch("mutateStore", { fct: "prepareDeck" });
      //   } else {
      //     this.mutateKey("cardsList", this.$store.state.cardsToReviseList);
      //   }
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  & > *:not(h3) {
    margin: 0.5rem;
    margin-left: 1rem;
  }
}
</style>
