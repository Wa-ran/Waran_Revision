<template>
  <div class="card" :class="$store.state.app.darkMode ? 'darkM' : ''">
    <slot name="topRight"></slot>
    <!-- <Doodle /> -->
    <div
      class="card-body d-flex flex-column bg-body rounded overflow-hidden p-0"
    >
      <div class="position-relative bg-transparent flex-grow-1 w-100">
        <div class="position-absolute top-0 start-0 w-100 h-100">
          <slot name="body">card-body</slot>
        </div>
      </div>

      <div
        v-if="this.$slots.footer"
        class="card-footer bg-transparent border-0 d-flex flex-column w-100 mt-auto pt-0"
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
</style>
