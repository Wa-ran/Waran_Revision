<template>
  <div
    class="card border-primary"
    :class="$store.state.app.darkMode ? 'darkM' : ''"
  >
    <Doodle />
    <div
      class="
        card-body
        border border-primary
        d-flex
        flex-column
        p-0
        m-3
        bg-transparent
      "
    >
      <div class="h-100 overflow-scroll">
        <slot name="body">card-body</slot>
      </div>

      <div
        v-if="this.$slots.footer"
        class="card-footer bg-body border-0 d-flex flex-column mt-auto"
      >
        <cust-hr class="mt-0 mb-1" />
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Doodle from "@/components/Doodle";

export default {
  name: "Card",
  components: {
    Doodle,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.card {
  overflow: hidden;
  background: linear-gradient(195deg, $white 55%, $primary 65%);
  &.darkM {
    background: linear-gradient(195deg, $black 55%, $orange-600 65%);
  }
}
.card-body {
  max-width: calc(100% - 2rem);
  max-height: calc(100% - 2rem);
}
</style>
