<template>
  <div>
    <div
      v-if="text"
      v-tooltip-stretch="text"
      data-bs-toggle="tooltip"
      data-bs-html="true"
      @blur="dispose"
      @click="dispose"
      class="stretch"
    >
      <slot><!-- Wrap an element => display title above that element --></slot>
    </div>
    <div v-else><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    text: {
      type: String,
      default: null,
    },
  },
  methods: {
    dispose() {
      clearInterval(this.interval);
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
