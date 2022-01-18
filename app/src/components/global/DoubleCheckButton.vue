<template>
  <button
    @click.prevent="doubleCheck($event)"
    @blur="checked = false"
    :class="checked ? 'btn-primary' : classDefault"
  >
    <slot v-if="!checked"></slot>
    <slot v-else name="checked">Confirmer ?</slot>
  </button>
</template>

<script>
export default {
  name: "DoubleCheckButton",
  props: {
    classDefault: String,
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
