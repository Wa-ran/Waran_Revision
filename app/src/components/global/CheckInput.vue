<template>
  <div class="form-check">
    <input
      v-model="check"
      class="form-check-input"
      type="checkbox"
      id="checkInput"
      tabindex="0"
    />
    <div class="d-flex w-fit">
      <label
        @click.prevent="check = !check"
        class="form-check-label text-white"
        for="checkInput"
      >
        {{ desc }}
      </label>
      <cust-tooltip v-if="tooltipText" :text="tooltipText" class="w-fit pt-1" />
    </div>
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
    tooltipText: {
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
