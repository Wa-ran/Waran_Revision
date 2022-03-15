<template>
  <div class="h-100 w-100">
    <div
      v-if="path && !error"
      class="custom overflow-scroll rounded h-100 custom border border-primary"
    >
      <img
        @error="error = true"
        class="m-auto w-100"
        :src="path"
        :id="card.id + face"
      />
    </div>
    <div
      v-else
      class="d-flex flex-column justify-content-center align-items-center h-100"
    >
      <font-awesome-icon
        :icon="['fas', 'camera']"
        size="3x"
        class="text-primary"
      />
      <div class="fst-italic">Image non trouvée</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardImage",
  data() {
    return {
      error: false,
    };
  },
  props: {
    card: {
      type: Object,
      default: null,
    },
    face: {
      type: String,
      default: null,
    },
    filePath: {
      type: String,
      default: null,
    },
  },
  computed: {
    path() {
      let path = this.filePath;
      if (!this.filePath) {
        if (this.card)
          path =
            this.$store.state.imagePath +
            this.card[this.face + "_image"] +
            ".webp";
        else if (!this.card)
          path =
            this.$store.state.imagePath +
            this.$store.state.actualCard[this.face + "_image"] +
            ".webp";
      }
      return path;
    },
  },
  watch: {
    path() {
      this.error = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.custom {
  display: block;
  max-width: 75vw !important;
  max-height: 40vh !important;
  margin: auto;
  box-shadow: inset 0 0 0 1px $primary;
}
</style>
