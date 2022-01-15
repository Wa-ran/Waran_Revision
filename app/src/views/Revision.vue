<template>
  <div class="w-fit mt-3 mx-auto">
    <RevisionCounter :key="submit" />
    <CardReviser @submitted="submit++" :key="submit" />
  </div>
</template>

<script>
import CardReviser from "@/components/CardReviser";
import RevisionCounter from "@/components/RevisionCounter";

export default {
  name: "revision",
  components: {
    CardReviser,
    RevisionCounter,
  },
  data() {
    return {
      submit: 0,
    };
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
