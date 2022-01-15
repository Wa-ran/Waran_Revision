<template>
  <div class="text-center">
    Encore
    <span class="bold">{{ cardsToReviseBaseList.length }}</span>
    carte{{ cardsToReviseBaseList.length > 1 ? "s" : "" }}
    à réviser
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
  mounted() {
    console.log(this.cardsToReviseBaseList.length);
  },
};
</script>
