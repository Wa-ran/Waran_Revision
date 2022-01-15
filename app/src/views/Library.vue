<template>
  <div>
    <router-view v-if="$route.name != 'Library'" />
    <div v-else class="d-flex justify-content-center flex-column">
      <button type="button" class="btn btn-outline-primary mx-auto">
        Créer un nouveau Deck
      </button>
      <div
        v-if="$store.state.decksList.length > 0"
        class="d-flex flex-wrap justify-content-center w-100"
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
    await this.$store.dispatch("getAllUserDecks").then(() => {
      this.mutateApp("decksCharged", true);
    });
  },
  unmounted() {
    this.mutateApp("decksCharged", false);
  },
  watch: {
    async $route() {
      if (this.$route.name == "Library")
        await this.$store.dispatch("getAllUserDecks").then(() => {
          this.mutateApp("decksCharged", true);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  width: 13rem;
}
</style>
