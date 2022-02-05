<template>
  <div
    v-tooltip-stretch="text"
    data-bs-toggle="tooltip"
    data-bs-html="true"
    @blur="dispose"
    @click.capture="dispose"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    text: String,
  },
  methods: {
    dispose() {
      this.$forceUpdate();
      document.querySelector(".tooltip").remove();
    },
  },
  unmounted() {
    try {
      document.querySelector(".tooltip").remove();
    } catch (error) {
      return;
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  outline: none;
}
</style>
