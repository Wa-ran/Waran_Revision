<template>
  <div class="w-fit mt-3 mx-auto">
    <CardHider class="position-absolute" style="z-index: 1000" />
    <Card>
      <template v-slot:body>
        <div class="w-100 h-100 overflow-scroll bg-body">
          {{ actualCard }}
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card";
import CardHider from "@/components/CardHider";

export default {
  name: "revision",
  components: {
    Card,
    CardHider,
  },
  computed: {
    actualCard() {
      return this.$store.getters.actualCard;
    },
    cardsToReviseBaseList() {
      return this.$store.state.cardsToReviseBaseList;
    },
  },
  async mounted() {
    await this.$store.dispatch("getCardsToReviseOnDeck").then(() => {
      this.mutateApp("cardsCharged", true);
    });
  },
  unmounted() {
    this.mutateApp("cardsCharged", false);
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 18rem;
  height: 30rem;
}
</style>
