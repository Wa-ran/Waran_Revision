<template>
  <button
    @click.prevent="doubleCheck($event)"
    @blur="checked = false"
    :class="checked ? classChecked : classDefault"
  >
    <slot v-if="!checked"></slot>
    <slot v-else name="checked">Confirmer ?</slot>
  </button>
</template>

<script>
export default {
  name: "DoubleCheckButton",
  props: {
    classDefault: {
      type: String,
      default: "btn-danger",
    },
    classChecked: {
      type: String,
      default: "btn-danger",
    },
  },
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
