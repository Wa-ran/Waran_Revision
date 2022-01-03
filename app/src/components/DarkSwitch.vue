<template>
  <div class="d-flex ms-3">
    <div class="text-yellow-600 has-icon">
      <font-awesome-icon :icon="['fas', 'sun']" />
    </div>
    <div class="form-check form-switch m-0 ms-2">
      <input
        class="form-check-input border-2 bg-transparent"
        type="checkbox"
        role="switch"
        id="darkMode"
        @change="toogleDarkMode"
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
      bsList: [
        "primary",
        "secondary",
        "success",
        "danger",
        "info",
        "body-color",
        "body-bg",
      ],
    };
  },
  methods: {
    toogleDarkMode(event) {
      let app = { ...this.$store.state.app };
      if (
        (event && event.target.checked) ||
        (!event &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.className = "dark";
        document.getElementById("darkMode").checked = true;
        app.darkMode = true;
        this.mutateKey("app", app);
        // this.classDarkSwitch(true);
      } else {
        document.documentElement.className = "";
        app.darkMode = false;
        this.mutateKey("app", app);
        // this.classDarkSwitch(false);
      }
    },
    // classDarkSwitch(bool) {
    //   let mode = bool ? "dark" : "light";
    //   let inverse = !bool ? "dark" : "light";
    //   document.body.innerHTML = document.body.innerHTML.replace(
    //     new RegExp(inverse, "g"),
    //     mode
    //   );
    //   this.bsList.forEach((element) => {
    //     let regex = new RegExp(`(?<=(class=").*)(${element})(?=.*("))`, "g");
    //     document.body.innerHTML = document.body.innerHTML.replace(
    //       regex,
    //       "d-" + element
    //     );
    //   });
    // },
  },
  mounted() {
    this.toogleDarkMode();
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
    border-color: $yellow-600;
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='%23ffc107'/></svg>") !important;
  }
  &:checked {
    border-color: $indigo-300;
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='%23a370f7'/></svg>") !important;
  }
}
</style>
