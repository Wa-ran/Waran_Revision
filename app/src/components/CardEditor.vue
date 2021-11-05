<template>
  <div class="container">
    <!-- <div>
      <div>Numéro de la carte : {{ actualCard.id }}</div>
      <div class="order_in_deck">
        <label for="order_in_deck">Place dans le deck :</label>
        <div class="number_input">
          <button>-</button>
          <input
            type="number"
            id="order_in_deck"
            name="order_in_deck"
            min="0"
            max="255"
            v-model="orderInDeckState"
          />
          <button>+</button>
        </div>
      </div>
    </div> -->
    <CheckButton
      @check="setCardParams('reverse', $event)"
      :desc="'Inverser question/réponse à chaque révision'"
      :preChecked="actualCard.reverse"
    />
    <CheckButton
      @check="setCardParams([cardFace + '_formula'], $event)"
      :desc="'Formule Mathématique'"
      :preChecked="actualCard[cardFace + '_formula']"
    />
    <CheckButton
      @check="modifComment($event)"
      :desc="'Modifer le commentaire'"
      :preChecked="modifCommentState"
      :key="modifCommentState"
    />
  </div>
</template>

<script>
import CheckButton from "@/components/CheckButton.vue";

export default {
  name: "CardEditor",
  components: {
    CheckButton,
  },
  props: {
    cardFace: { type: String, default: "recto" },
  },
  data() {
    return {
      cardTagsListKey: 0,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    modifCommentState() {
      return this.$store.state.modifComment;
    },
    orderInDeckState() {
      return this.$store.state.actualCard.order_in_deck || null;
    },
    tagsListLength() {
      return this.$store.state.tagsList.length;
    },
  },
  methods: {
    modifComment(modif) {
      this.mutateKey("modifComment", modif);
    },
    setCardParams(key, value) {
      let card = { ...this.$store.state.actualCard };
      card[key] = value;
      this.mutateKey("actualCard", card);
    },
  },
  unmounted() {
    this.modifComment(false);
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.container {
  & > * {
    margin: 0.5rem;
    margin-left: 1rem;
  }
}
.order_in_deck {
  display: flex;
}
.number_input {
  margin-left: 0.5rem;
  display: flex;
  width: fit-content;
  min-height: 1.15rem;
  max-height: 1.15rem;
}
button {
  border-radius: 0.15rem;
  padding: 0.25rem;
  min-height: 1.15rem;
  max-height: 1.15rem;
  min-width: 1.15rem;
  max-width: 1.15rem;
}
input {
  background-color: $dark_blue;
  height: auto;
  padding: 0.25rem;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
</style>
