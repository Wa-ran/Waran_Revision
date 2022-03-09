<template>
  <div class="w-100">
    <button
      v-if="positionSaved"
      @click="
        $router.push(
          positionSavedDesc ? positionSaved.path : { name: 'DeckView' }
        )
      "
      class="position-absolute d-flex flex-row align-items-center btn btn-outline-primary border-0 h-fit w-fit mt-1 mb-n5 ms-md-3 py-1 text-nowrap"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" size="sm" />
      <span class="px-1"> {{ positionSavedDesc || "Voir le deck" }}</span>
    </button>

    <button
      v-if="positionSaved.name && positionSaved.name === 'NewCard'"
      @click="$router.push({ name: 'NewCard' })"
      class="position-absolute end-0 d-flex flex-row align-items-center btn btn-outline-primary border-0 h-fit w-fit mt-1 mb-n5 me-3 me-md-4 py-1 text-nowrap"
    >
      <span class="px-1"> {{ "Créer une autre carte" }}</span>
      <font-awesome-icon :icon="['fas', 'arrow-right']" size="sm" />
    </button>
  </div>
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
        case "DeckView":
          return "Voir le deck";
        default:
          return null;
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
