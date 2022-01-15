<template>
  <div class="w-fit mt-3 mx-auto">
    <div class="text-center">
      Encore
      <span class="bold">{{ cardsToReviseBaseList.length }}</span>
      carte{{ cardsToReviseBaseList.length > 1 ? "s" : "" }}
      à réviser
    </div>
    <CardReviser @submitted="submit++" :key="submit" />
  </div>
</template>

<script>
import CardReviser from "@/components/CardReviser";

export default {
  name: "revision",
  components: {
    CardReviser,
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
