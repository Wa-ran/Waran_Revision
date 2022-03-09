<template>
  <div class="d-flex ms-3">
    <div class="text-yellow-500 has-icon">
      <font-awesome-icon :icon="['fas', 'sun']" />
    </div>
    <div class="form-check form-switch m-0 ms-2">
      <input
        class="form-check-input border-2 bg-transparent"
        type="checkbox"
        role="switch"
        id="darkMode"
        @click="mutateApp('darkMode', $event.target.checked)"
        tabindex="0"
        v-model="appDarkMode"
      />
      <label class="form-check-label aria-only" for="darkMode"
        >Activer le mode nuit</label
      >
    </div>
    <div class="text-indigo-300 has-icon">
      <font-awesome-icon :icon="['fas', 'moon']" size="sm" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DarkSwitch",
  data() {
    return {
      watch: false,
    };
  },
  computed: {
    appDarkMode() {
      return this.$store.state.app.darkMode;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.has-icon {
  font-size: 1.15rem;
  display: flex;
  align-items: center;
}

input.form-check-input {
  box-shadow: none !important;
  &:not(:checked) {
    border-color: $yellow-500;
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='%23ffc107'/></svg>") !important;
    &:hover,
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba($yellow-500, 0.3) !important;
    }
  }
  &:checked {
    border-color: $indigo-300;
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='%23a370f7'/></svg>") !important;
    &:hover,
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba($indigo-300, 0.3) !important;
    }
  }
}
</style>
