<template>
  <div
    class="homeContent position-fixed overflow-scroll container-fluid d-flex flex-column p-0 pb-5 h-100"
  >
    <Header class="sticky-top border-bottom border-primary" />
    <!-- <BreadCrumb /> -->
    <div class="d-flex flex-column flex-md-row flex-grow-1 h-fit pb-5">
      <main
        class="d-flex justify-content-center align-items-start h-fit m-auto px-3 py-4 order-md-2"
      >
        <ChangeLog v-if="$route.name == 'Home'" />
        <router-view v-else class="w-100" />
      </main>
      <aside class="order-md-1 mt-md-4">
        <Aside />
      </aside>
      <aside class="order-md-3 mt-md-4">
        <Aside2 />
      </aside>
    </div>
    <Footer class="border-top border-primary fixed-bottom" />
  </div>
</template>

<script>
import Aside from "@/views/Aside";
import ChangeLog from "@/views/ChangeLog";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "Home",
  components: {
    Aside,
    ChangeLog,
    Header,
    Footer,
  },
  updated() {
    let asides = document.querySelectorAll("aside");
    if (asides[0].scrollWidth > asides[1].scrollWidth)
      asides[1].style.width = asides[0].scrollWidth;
    else asides[0].style.width = asides[1].scrollWidth;
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.homeContent {
  & > * {
    &:first-child,
    &:last-child {
      box-shadow: 0 0 2.5rem 0.25rem rgba($primary, 0.2) !important;
    }
    &:not(:first-child, :last-child) {
      box-shadow: inset 2.5rem 0 2.5rem -2.25rem rgba($primary, 0.2),
        inset -2.5rem 0 2.5rem -2.25rem rgba($primary, 0.2) !important;
    }
  }
}
main {
  max-width: 500px;
}
</style>
