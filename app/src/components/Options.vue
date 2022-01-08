<template>
  <div class="dropend">
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
      class="position-relative dropdown-menu dropdown-menu-dark w-fit mt-n4 ms-n2"
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
    };
  },
  computed: {
    cardChronoCheck() {
      return this.$store.state.app.cardChronoCheck;
    },
    cardHideCheck() {
      return this.$store.state.app.cardHideCheck;
    },
  },
  mounted() {
    this.chrono = this.cardChronoCheck;
    this.hide = this.cardHideCheck;
  },
  watch: {
    cardChronoCheck() {
      this.chrono = this.cardChronoCheck;
    },
    cardHideCheck() {
      this.hide = this.cardHideCheck;
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
