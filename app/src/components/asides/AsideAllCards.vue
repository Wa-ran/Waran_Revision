<template>
  <div class="position-absolute mt-2 mt-md-0 w-100">
    <div
      v-if="!sequence"
      class="form-check text-primary w-fit mx-auto ms-md-3 ms-auto"
    >
      <input
        v-model="hide"
        class="form-check-input"
        type="checkbox"
        id="allCardsShowCheck"
        tabindex="1"
        @click="mutateApp('allCardsShowCheck', !allCardsShowCheck)"
      />
      <label class="form-check-label text-nowrap" for="allCardsShowCheck">
        Afficher les cartes à réviser
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "AsideAllCards",
  data() {
    return {
      hide: true,
    };
  },
  computed: {
    allCardsShowCheck() {
      return this.$store.state.app.allCardsShowCheck;
    },
    sequence() {
      return this.$store.getters.actualDeck.sequence;
    },
  },
  mounted() {
    if (this.sequence) this.mutateApp("allCardsShowCheck", true);
    else this.mutateApp("allCardsShowCheck", false);
    this.hide = this.allCardsShowCheck;
  },
};
</script>

<style lang="scss" scoped>
.form-check {
  font-size: 0.9rem;
}
</style>
