<template>
  <div class="dropdown">
    <div class="dropdown position-relative">
      <button
        class="nav-link dropdown-toggle text-decoration-none"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Options de révision
      </button>
      <div
        class="dropdown-menu dropdown-menu-dark mt-n2"
        aria-labelledby="dropdownMenuButton2"
      >
        <div class="px-3">
          <div class="form-check">
            <input
              v-model="app.cardHide"
              class="form-check-input"
              type="checkbox"
              id="cardHideCheck"
              tabindex="1"
              @change="mutateApp('cardHide', app.cardHide)"
            />
            <label class="form-check-label" for="cardHideCheck">
              Cacher les cartes
            </label>
          </div>
          <div class="form-check">
            <input
              v-model="app.cardChrono"
              class="form-check-input"
              type="checkbox"
              id="cardChronoCheck"
              tabindex="1"
              @change="mutateApp('cardChrono', app.cardChrono)"
            />
            <label class="form-check-label" for="cardChronoCheck">
              Chronomètre
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  data() {
    return {
      app: {},
    };
  },
  computed: {
    appState() {
      return this.$store.state.app;
    },
  },
  mounted() {
    this.app = this.appState;
  },
};
</script>

<style lang="scss" scoped>
button:not(:focus),
button:focus-within {
  box-shadow: none !important;
}
label {
  width: max-content;
}
</style>
