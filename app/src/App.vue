<template>
  <div id="view">
    <Modal />
    <router-view />
  </div>
</template>

<script>
import app from "@/mixins/app";
import Modal from "@/components/Modal";

export default {
  name: "App",
  components: {
    Modal,
  },
  mixins: [app],
};
</script>

<style lang="scss">
@import "./styles/global.scss";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
