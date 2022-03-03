<template>
  <div>
    <input
      v-model="check"
      class="form-check-input"
      type="checkbox"
      id="checkInput"
      tabindex="1"
    />
    <label class="form-check-label" for="checkInput">
      {{ desc }}
    </label>
  </div>
</template>

<script>
export default {
  name: "CheckInput",
  props: {
    appKey: {
      type: String,
      default: null,
    },
    desc: {
      type: String,
      default: null,
    },
  },
  computed: {
    check: {
      get() {
        return this.$store.state.app[this.appKey];
      },
      set() {
        this.mutateApp(this.appKey, !this.check);
      },
    },
  },
};
</script>
