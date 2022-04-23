<template>
  <div
    type="button"
    v-tooltip="text"
    class="tooltip-btn text-primary mt-n2 mx-1"
    data-bs-toggle="tooltip"
    data-bs-html="true"
    tabindex="0"
    @click="showing = !showing"
    @blur="dispose"
  >
    <font-awesome-icon
      :icon="['far', 'question-circle']"
      size="sm"
      class="bg-body rounded-circle"
    />
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
        try {
          document.querySelector(".tooltip").remove();
        } catch (error) {
          return;
        }
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
