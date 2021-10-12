<template>
  <button
    @click="doubleCheck($event)"
    @blur="checked = false"
    :class="checked ? 'checked' : 'default'"
  >
    <slot></slot>
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
