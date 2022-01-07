<template>
  <div class="position-fixed overflow-scroll container-fluid p-0 h-100">
    <Header class="sticky-top border-bottom border-primary" />
    <!-- <BreadCrumb /> -->
    <main
      class="
        overflow-scroll
        d-flex
        justify-content-center
        align-items-start
        m-auto
        px-3
        py-4
      "
    >
      <ChangeLog v-if="$route.name == 'Home'" />
      <router-view v-else class="w-100" />
    </main>
    <Footer class="border-top border-primary fixed-bottom" />
  </div>
</template>

<script>
import ChangeLog from "@/views/ChangeLog";

// import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "Home",
  components: {
    // BreadCrumb,
    ChangeLog,
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
main {
  min-height: 100%;
  max-width: 500px;
}
</style>
