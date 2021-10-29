<template>
  <div class="container">
    <h3>Options de révisions:</h3>
    <CheckButton
      @check="mutateKey('cardChrono', $event)"
      :desc="'Chronomètre'"
      :preChecked="cardChronoState"
      :key="cardChronoState"
    />
  </div>
</template>

<script>
import CheckButton from "@/components/CheckButton.vue";

export default {
  name: "UserOptions",
  components: {
    CheckButton,
  },
  computed: {
    cardChronoState() {
      return this.$store.state.cardChrono;
    },
  },
};
</script>
