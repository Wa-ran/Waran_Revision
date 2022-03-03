<template>
  <div class="btn-group dropend">
    <button
      class="nav-link dropdown-toggle"
      type="button"
      id="dropdownMenuButton2"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ btnText }}
    </button>
    <div
      class="dropdown-menu dropdown-menu-dark bg-dark border border-primary w-fit mt-2"
      aria-labelledby="dropdownMenuButton2"
    >
      <div class="px-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  props: {
    btnText: {
      type: String,
      default: "Options",
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
.form-check {
  font-size: 0.9rem;
}
</style>
