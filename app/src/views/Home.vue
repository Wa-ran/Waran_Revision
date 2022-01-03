<template>
  <div class="container-fluid p-0 h-100">
    <Modal />
    <Header class="border-bottom border-primary" />
    <main
      class="d-flex justify-content-center align-items-start h-auto p-3 pb-5"
    >
      <router-view />
      <!-- <ChangeLog v-if="!connected" />
      <MenuDecks v-else /> -->
    </main>
    <Footer class="border-top border-primary fixed-bottom" />
  </div>
</template>

<script>
// import { defineAsyncComponent } from "vue";

// import ChangeLog from "@/components/ChangeLog";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "Home",
  components: {
    // ChangeLog,
    // MenuDecks: defineAsyncComponent(() => import("@/views/MenuDecks.vue")),
    Modal,
    Header,
    Footer,
  },
  computed: {
    connected() {
      return this.$store.state.app.connected;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  min-height: 100%;
}
</style>
