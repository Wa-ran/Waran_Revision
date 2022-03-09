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
      {{ btnText }}
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
};
</script>

<style lang="scss" scoped>
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
</style>
