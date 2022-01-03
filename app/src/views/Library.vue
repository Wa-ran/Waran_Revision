<template>
  <div class="d-flex justify-content-center flex-column">
    <button
      type="button"
      class="btn btn-outline-primary align-self-sm-start m-auto m-sm-3"
    >
      Créer un nouveau Deck
    </button>
    <div
      v-if="$store.state.decksList.length > 0"
      class="d-flex flex-wrap justify-content-center"
      :key="$store.state.decksList.length"
    >
      <Deck
        v-for="deck of $store.state.decksList"
        :key="deck.id"
        :deck="deck"
        class="m-3"
      />
    </div>
  </div>
</template>

<script>
import Deck from "@/components/Deck";

export default {
  name: "Library",
  components: {
    Deck,
  },
  async mounted() {
    await this.$store.dispatch("getAllUserDecks");
  },
};
</script>

<style lang="scss" scoped>
button {
  width: 13rem;
}
</style>
