<template>
  <button
    @click="doubleCheck($event)"
    @blur="checked = false"
    :class="checked ? 'checked' : 'highlight white-active'"
  >
    <slot v-if="!checked"></slot>
    <slot v-else name="checked"></slot>
  </button>
</template>

<script>
export default {
  name: "DoubleCheckButton",
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    doubleCheck(event) {
      if (this.checked) {
        this.$emit("checkedClick", event);
        this.checked = false;
      } else this.checked = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

button.checked {
  box-shadow: inset 0 0 0 2px $dark_bgc, 0 0 2px 2px $white;
  border-color: $white;
  &:hover {
    background-color: $white;
  }
}
</style>
