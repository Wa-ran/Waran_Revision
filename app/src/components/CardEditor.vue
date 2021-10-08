<template>
  <div>
    <CheckButton
      @check="setCardParams('reverse', $event)"
      :desc="'Inversion de la carte'"
      :preChecked="actualCard.reverse"
    />
    <CheckButton
      @check="setCardParams([cardFace + '_formula'], $event)"
      :desc="'Formule Mathématique'"
      :preChecked="actualCard[cardFace + '_formula']"
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
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
  },
  methods: {
    setCardParams(key, value) {
      let card = { ...this.$store.state.actualCard };
      card[key] = value;
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "actualCard",
          body: card,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
