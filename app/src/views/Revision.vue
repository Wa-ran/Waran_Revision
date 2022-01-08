<template>
  <div class="w-fit mt-3 mx-auto">
    <CardReviser />
  </div>
</template>

<script>
import CardReviser from "@/components/CardReviser";

export default {
  name: "revision",
  components: {
    CardReviser,
  },
  computed: {
    cardsToReviseBaseList() {
      return this.$store.state.cardsToReviseBaseList;
    },
  },
  async mounted() {
    await this.$store.dispatch("getCardsToReviseOnDeck").then(() => {
      this.mutateApp("cardsListCharged", true);
    });
  },
  unmounted() {
    this.mutateApp("cardsListCharged", false);
  },
};
</script>

<style lang="scss">
.card {
  width: 18rem;
  height: 30rem;
}
</style>
