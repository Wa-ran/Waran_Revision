<template>
  <div class="btn-group dropdown">
    <button
      class="nav-link dropdown-toggle bg-dark border border-primary rounded mt-2 px-2 py-1"
      type="button"
      id="dropdownMenuButton2"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      <span v-if="!['xs', 'sm'].includes($store.state.app.windowSize)">{{
        btnText
      }}</span>
      <font-awesome-icon v-else :icon="['fas', 'cog']" size="lg" />
    </button>
    <div
      class="dropdown-menu dropdown-menu-dark bg-dark border border-primary mt-2 ms-3"
      aria-labelledby="dropdownMenuButton2"
    >
      <div class="px-3">
        <CheckInput
          v-for="(option, index) of optionsList"
          :key="index"
          :appKey="option.appKey"
          :desc="option.desc"
          :tooltipText="option.tooltipText"
          @click="handleRadio(option)"
          v-show="option"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CheckInput from "@/components/global/CheckInput.vue";

export default {
  name: "Options",
  components: {
    CheckInput,
  },
  props: {
    btnText: {
      type: String,
      default: "Options",
    },
    optionsList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleRadio(option) {
      if (this.$store.state.app[option.appKey] && option.radio) {
        for (let opt of this.optionsList) {
          if (opt.radio && opt.appKey !== option.appKey)
            this.mutateApp(opt.appKey, false);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

button:not(:focus),
button:focus-within {
  box-shadow: none !important;
}
.dropdown-menu {
  width: max-content;
  max-width: 90vw;
}
.form-check {
  font-size: 0.9rem;
}

.dark .dropdown-toggle {
  color: $primary;
}
</style>
