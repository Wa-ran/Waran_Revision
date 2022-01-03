<template>
  <div class="w-100">
    <div class="d-flex">
      <h2>Deck : {{ actualDeck.title }}</h2>
    </div>

    <div v-if="$route.name == 'Revision'" class="m-auto w-fit">
      <router-view />
    </div>

    <div v-else>
      <cust-hr class="my-3 mx-auto w-75" />
      <h3>Description :</h3>
      <p class="ms-3">{{ actualDeck.text || "Pas de description" }}</p>
      <cust-hr class="my-3 mx-auto w-75" />

      <button class="btn btn-primary h-fit mx-auto py-0">Modifier</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeckView",
  computed: {
    actualDeck() {
      return this.$store.getters.actualDeck;
    },
  },
  mounted() {
    this.mutateApp("deckCharged", true);
  },
  unmounted() {
    this.mutateApp("deckCharged", false);
  },
};
</script>
