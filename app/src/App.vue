<template>
  <div id="view">
    <router-view />
  </div>
</template>

<script>
import app from "@/mixins/app";

export default {
  name: "App",
  mixins: [app],
};
</script>

<style lang="scss">
@import "./styles/global.scss";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
