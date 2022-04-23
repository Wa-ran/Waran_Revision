<template>
  <a
    :type="current ? '' : 'button'"
    @click="$router.push(this.linkObj)"
    @keyup.enter="$router.push(this.linkObj)"
    :class="current ? 'active text-primary' : this.disabled ? 'disabled' : ''"
    class="w-fit h-fit"
    :aria-current="current ? 'page' : false"
    :tabindex="current || this.disabled ? -1 : 0"
  >
    <slot name="link"> {{ linkText }} </slot>
  </a>
</template>

<script>
export default {
  name: "Link",
  props: {
    linkObj: Object,
    linkText: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    current() {
      return this.$route.name == this.linkObj.name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

a {
  &:not(.disabled):not(.active):hover,
  &:not(.disabled):not(.active):focus-within {
    text-decoration: underline !important;
  }
  &.active {
    box-shadow: none;
    cursor: default;
  }
}
</style>
