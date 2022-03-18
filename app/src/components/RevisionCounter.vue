<template>
  <div>
    <div v-if="cardsToReviseBaseList.length > 0" class="text-center">
      Encore
      <span class="bold">{{ cardsToReviseBaseList.length }}</span>
      carte{{ cardsToReviseBaseList.length > 1 ? "s" : "" }}
      à réviser
    </div>
    <div v-else class="mt-5 fs-5 fst-italic fw-bold text-primary">
      Vous n'avez plus de cartes à réviser !
    </div>
  </div>
</template>

<script>
export default {
  name: "RevisionCounter",
  computed: {
    cardsToReviseBaseList() {
      return this.$store.state.cardsToReviseBaseList;
    },
  },
};
</script>
