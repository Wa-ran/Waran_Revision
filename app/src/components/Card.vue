<template>
  <div class="card" :class="$store.state.app.darkMode ? 'darkM' : ''">
    <div class="topRight bg-body position-absolute top-0 end-0 m-n1">
      <slot name="topRight"></slot>
    </div>
    <!-- <Doodle /> -->
    <div
      class="card-body rounded overflow-hidden d-flex flex-column p-0 bg-transparent"
    >
      <div class="h-100 overflow-scroll bg-body pb-2">
        <slot name="body">card-body</slot>
      </div>

      <div
        v-if="this.$slots.footer"
        class="card-footer bg-body border-0 d-flex flex-column mt-auto pt-0"
      >
        <cust-hr class="mt-0 mb-1" />
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
// import Doodle from "@/components/Doodle";

export default {
  name: "Card",
  // components: {
  //   Doodle,
  // },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.card {
  // overflow: hidden;
  // background: linear-gradient(195deg, $white 55%, $primary 65%);
  // &.darkM {
  //   background: linear-gradient(195deg, $black 55%, $orange-600 65%);
  // }
  background-color: $primary !important;
  border-radius: 0.5rem !important;
}
.card-body {
  max-width: calc(100% - 0.2rem);
  max-height: calc(100% - 0.2rem);
  margin: 0.2rem;
}
.topRight {
  z-index: 1500;
}
</style>
