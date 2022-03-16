<template>
  <div class="d-flex justify-content-center">
    <h2 class="d-flex justify-content-center w-100 m-0">
      <cust-a
        :linkObj="{
          name: 'DeckView',
          params: { deck: $route.params.deck },
        }"
        :linkText="actualDeck.title || 'Votre deck'"
        class="btn btn-link fs-2 py-0 text-decoration-none"
      />
    </h2>
  </div>
</template>

<script>
export default {
  name: "DeckTitle",
  computed: {
    actualDeck() {
      return this.$store.state.actualDeck;
    },
  },
};
</script>
