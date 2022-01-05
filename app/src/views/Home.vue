<template>
  <div class="position-fixed overflow-scroll container-fluid p-0 h-100">
    <Header class="sticky-top border-bottom border-primary" />
    <main
      class="
        overflow-scroll
        d-flex
        justify-content-center
        align-items-start
        m-auto
        px-3
        py-5
      "
    >
      <ChangeLog v-if="$route.name == 'Home'" />
      <router-view v-else />
    </main>
    <Footer class="border-top border-primary fixed-bottom" />
  </div>
</template>

<script>
// import { defineAsyncComponent } from "vue";

import ChangeLog from "@/views/ChangeLog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "Home",
  components: {
    ChangeLog,
    // MenuDecks: defineAsyncComponent(() => import("@/views/MenuDecks.vue")),
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
main {
  min-height: 100%;
  @media (min-width: 992px) {
    max-width: 75vw;
  }
}
</style>
