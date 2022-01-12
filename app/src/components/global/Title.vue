<template>
  <div
    v-tooltip-stretch="text"
    data-bs-toggle="tooltip"
    data-bs-html="true"
    @blur="dispose"
    @click="dispose"
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
  data() {
    return {
      showing: false,
    };
  },
  methods: {
    dispose() {
      if (this.showing) {
        this.$forceUpdate();
        document.querySelector(".tooltip").remove();
      }
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
