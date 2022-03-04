<template>
  <button
    v-if="positionSaved"
    @click="$router.push(positionSaved.path)"
    class="position-absolute d-flex flex-row align-items-center btn btn-outline-primary border-0 h-fit w-fit mt-1 mb-n5 ms-md-3 py-1 text-nowrap"
  >
    <font-awesome-icon :icon="['fas', 'arrow-left']" size="sm" />
    <span class="px-1"> {{ positionSavedDesc }}</span>
  </button>
</template>

<script>
export default {
  name: "AsideCardView",
  computed: {
    positionSaved() {
      return this.$store.state.app.positionSaved;
    },
    positionSavedDesc() {
      switch (this.positionSaved.name) {
        case "Revision":
          return "Retourner réviser";
        case "AllCards":
          return "Revenir à la liste de cartes";
        default:
          return "Voir le deck";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  font-size: 0.9rem;
}
</style>
