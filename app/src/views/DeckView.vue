<template>
  <div>
    {{ actualDeck }}
    <div class="m-auto w-fit"><router-view /></div>
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
