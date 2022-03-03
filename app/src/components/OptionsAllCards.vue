<template>
  <Options :btnText="'Options de révisions'">
    <div v-if="!sequence" class="form-check">
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
  </Options>
</template>

<script>
export default {
  name: "OptionsAllCards",
  data() {
    return {
      hide: true,
    };
  },
  computed: {
    allCardsShowCheck() {
      return this.$store.state.app.allCardsShowCheck;
    },
  },
  mounted() {
    if (this.$store.getters.actualDeck.sequence)
      this.mutateApp("allCardsShowCheck", true);
    else this.mutateApp("allCardsShowCheck", false);
    this.hide = this.allCardsShowCheck;
  },
};
</script>
