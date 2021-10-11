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
    <CheckButton
      @check="modifComment($event)"
      :desc="'Modifer le commentaire'"
      :preChecked="false"
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
    modifComment(event) {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "modifComment",
          body: event,
        },
      });
    },
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
  mounted() {
    this.modifComment(false);
  },
};
</script>

<style lang="scss" scoped></style>
