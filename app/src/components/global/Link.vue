<template>
  <a
    :type="this.current ? '' : 'button'"
    @click="$router.push({ name: this.linkName })"
    :class="
      this.current ? 'active text-primary' : this.disabled ? 'disabled' : ''
    "
    class="w-fit h-fit"
    :aria-current="this.current ? 'page' : false"
    :tabindex="this.current || this.disabled ? -1 : 1"
  >
    <slot name="link"> {{ linkText }} </slot>
  </a>
</template>

<script>
export default {
  name: "Link",
  props: {
    linkName: String,
    linkText: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    current() {
      return this.$route.name == this.linkName;
    },
  },
};
</script>

<style lang="scss" scoped>
a:not(.disabled):not(.active):hover {
  text-decoration: underline;
}
</style>
