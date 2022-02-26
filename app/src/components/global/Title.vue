<template>
  <div
    v-tooltip-stretch="text"
    data-bs-toggle="tooltip"
    data-bs-html="true"
    @blur="dispose"
    @click="dispose"
    class="stretch"
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
      clearInterval(this.interval)
      this.$forceUpdate();
      try {
        document.querySelector(".tooltip").remove();
      } catch (error) {
        return;
      }
    },
  },
  unmounted() {
    this.dispose();
  },
};
</script>

<style lang="scss" scoped>
div {
  outline: none;
}
</style>
