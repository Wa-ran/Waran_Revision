<template>
  <div
    class="homeContent position-fixed overflow-scroll container-fluid d-flex flex-column p-0 pb-5 h-100"
  >
    <div class="sticky-top">
      <Header class="border-bottom border-primary" />
      <OverlayTop class="above position-absolute w-100" />
    </div>
    <div
      class="position-relative d-flex flex-column flex-md-row align-items-start flex-grow-1 h-fit pb-5 pt-4"
    >
      <aside class="mt-md-3 w-100">
        <Aside />
      </aside>
      <main
        class="d-flex justify-content-center align-items-start h-fit mx-auto mt-n1 mt-md-n4 px-md-3 py-md-3 w-100"
      >
        <ChangeLog v-if="$route.name == 'Home'" class="mt-n3" />
        <router-view v-else class="w-100" />
      </main>
      <aside class="mt-md-3 w-100">
        <Aside2 />
      </aside>
      <OverlayBot class="above fixed-bottom w-100 mx-auto mb-5" />
    </div>
    <Footer class="above border-top border-primary fixed-bottom" />
  </div>
</template>

<script>
import Aside from "@/views/Aside";
import Aside2 from "@/views/Aside2";
import ChangeLog from "@/views/ChangeLog";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OverlayBot from "@/components/OverlayBot";
import OverlayTop from "@/components/OverlayTop";

export default {
  name: "Home",
  components: {
    Aside,
    Aside2,
    ChangeLog,
    Header,
    Footer,
    OverlayBot,
    OverlayTop,
  },
  created() {
    if (location.protocol == "https:") location.protocol = "http:";
    this.mutateKey("showPage", "revisionPage");
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.homeContent {
  & .sticky-top {
    z-index: 2000;
  }
  & > * {
    &:first-child,
    &:last-child {
      box-shadow: 0 0 2.5rem 0.25rem rgba($primary, 0.1) !important;
    }
    &:not(:first-child, :last-child) {
      box-shadow: inset 2.5rem 0 2.5rem -2.25rem rgba($primary, 0.1),
        inset -2.5rem 0 2.5rem -2.25rem rgba($primary, 0.1) !important;
    }
  }
}
main {
  min-width: fit-content !important;
  max-width: 500px;
}
aside {
  min-height: 1rem;
}
</style>
