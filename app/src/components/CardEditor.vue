<template>
  <div>
    <CheckButton
      @check="setCardReverse($event)"
      :desc="'Inversion de la carte'"
      :preChecked="reverseCard"
    />
    <CheckButton :desc="'Formule mathématique'" />
  </div>
</template>

<script>
import CheckButton from "@/components/CheckButton.vue";
export default {
  name: "CardEditor",
  components: {
    CheckButton,
  },
  data() {
    return {
      reverseCard: true,
    };
  },
  methods: {
    setCardReverse(bool) {
      let card = { ...this.$store.state.actualCard };
      card.reverse = bool;
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
    this.reverseCard = this.$store.state.actualCard.reverse;
  },
};
</script>

<style lang="scss" scoped></style>
