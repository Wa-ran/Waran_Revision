<template>
  <div
    type="button"
    v-tooltip="text"
    class="text-primary mt-n2 mx-1"
    data-bs-toggle="tooltip"
    data-bs-html="true"
    tabindex="0"
    @click="showing = true"
    @blur="dispose"
  >
    <font-awesome-icon :icon="['far', 'question-circle']" size="sm" />
  </div>
</template>

<script>
export default {
  name: "ToolTip",
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
