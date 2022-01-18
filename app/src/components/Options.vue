<template>
  <div class="btn-group dropend">
    <button
      class="nav-link dropdown-toggle"
      type="button"
      id="dropdownMenuButton2"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Options de révision
    </button>
    <div
      class="dropdown-menu dropdown-menu-dark bg-dark border border-primary w-fit mt-2"
      aria-labelledby="dropdownMenuButton2"
    >
      <div class="px-3">
        <div class="form-check">
          <input
            v-model="hide"
            class="form-check-input"
            type="checkbox"
            id="cardHideCheck"
            tabindex="1"
            @click="mutateApp('cardHideCheck', !cardHideCheck)"
          />
          <label class="form-check-label" for="cardHideCheck">
            Cacher les cartes
          </label>
        </div>

        <div class="form-check">
          <input
            v-model="chrono"
            class="form-check-input"
            type="checkbox"
            id="cardChronoCheck"
            tabindex="1"
            @click="mutateApp('cardChronoCheck', !cardChronoCheck)"
          />
          <label class="form-check-label" for="cardChronoCheck">
            Chronomètre
          </label>
        </div>

        <div class="form-check">
          <input
            v-model="fast"
            class="form-check-input"
            type="checkbox"
            id="fastMode"
            tabindex="1"
            @click="mutateApp('fastMode', !fastMode)"
          />
          <label class="form-check-label" for="fastMode"> Mode rapide </label>
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
      chrono: true,
      hide: true,
      fast: true,
    };
  },
  computed: {
    cardChronoCheck() {
      return this.$store.state.app.cardChronoCheck;
    },
    cardHideCheck() {
      return this.$store.state.app.cardHideCheck;
    },
    fastMode() {
      return this.$store.state.app.fastMode;
    },
  },
  mounted() {
    this.chrono = this.cardChronoCheck;
    this.hide = this.cardHideCheck;
    this.fast = this.fastMode;
  },
  watch: {
    cardChronoCheck() {
      this.chrono = this.cardChronoCheck;
    },
    cardHideCheck() {
      this.hide = this.cardHideCheck;
    },
    fastMode() {
      this.fats = this.fastMode;
    },
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
