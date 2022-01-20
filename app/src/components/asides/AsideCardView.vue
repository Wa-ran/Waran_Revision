<template>
  <button
    v-if="positionSaved"
    @click="$router.push(positionSaved.path)"
    class="position-relative btn btn-outline-primary border-0 h-fit w-fit mt-1 mb-n5 py-1"
  >
    <font-awesome-icon :icon="['fas', 'arrow-left']" size="lg" />
    <span class="px-2"> {{ positionSavedDesc }}</span>
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
      let positionSaved = this.positionSaved ? this.positionSaved.name : null;
      switch (positionSaved) {
        case "Revision":
          return "Retourner réviser";
        case "Liste":
          return "Revenir à la liste de cartes";
        default:
          return null;
      }
    },
  },
};
</script>
