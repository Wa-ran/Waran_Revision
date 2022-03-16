<template>
  <div class="form-check d-flex align-items-center mt-2 p-0">
    <div class="italic me-2">Deck :</div>
    <select
      class="form-select form-select-sm w-fit h-fit bg-body m-0"
      aria-label="Transérer dans un autre deck"
      aria-describedby="selectDeckDesc"
      @change="$emit('changeDeck', value)"
    >
      <option
        v-for="deck of $store.state.decksList"
        :key="deck.id"
        :value="deck.id"
      >
        {{ deck.title }}
      </option>
      <option
        v-if="
          $store.state.decksList[$store.state.decksList.length - 1].title !==
          'Nouveau deck'
        "
        value="new"
        class="fst-italic"
      >
        Créer un nouveau deck
      </option>
    </select>
    <cust-tooltip
      id="selectDeckDesc"
      class="mt-n4"
      :text="'Choisissez à quel deck appartient la carte.'"
    />
  </div>
</template>

<script>
export default {
  name: "SelectDeck",
  mounted() {
    let select = document.querySelectorAll("select option");
    for (let option of select) {
      if (option.value == this.$store.state.actualDeck.id)
        return (option.selected = true);
    }
  },
};
</script>

<style lang="scss" scoped>
.form-select {
  color: currentColor;
}
</style>
