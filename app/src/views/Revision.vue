<template>
  <div class="mt-3">
    <Card>
      <template v-slot:body>
        <div class="w-100 h-100 overflow-scroll">
          {{ actualCard }}
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "revision",
  components: {
    Card,
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
      this.cardsToRevise = this.cardsToReviseBaseList.slice();
    });
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 18rem;
  height: 30rem;
}
</style>
