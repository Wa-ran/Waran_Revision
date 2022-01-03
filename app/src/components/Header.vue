<template>
  <header class="container-fluid dark shadow">
    <nav class="navbar navbar-expand-lg navbar-dark justify-content-end">
      <div
        class="
          border-end border-primary
          position-absolute
          top-0
          start-0
          me-2
          my-1
          py-2
        "
      >
        <a class="navbar-brand m-0 pe-3 py-3" href="#"> Waran </a>
      </div>
      <Connexion v-if="!user.id" class="flex-grow-1" />
      <button
        v-if="user.id"
        class="navbar-toggler btn btn-outline-primary shadow-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#HeaderNav"
        aria-controls="HeaderNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
      </button>

      <div
        v-if="user.id"
        class="
          collapse
          navbar-collapse
          border-top border-primary
          mt-2
          ms-sm-5
          ps-sm-5
        "
        id="HeaderNav"
      >
        <Navigation />
      </div>
    </nav>
  </header>
</template>

<script>
import Connexion from "@/components/Connexion";
import Navigation from "@/components/Navigation";

export default {
  name: "Header",
  components: {
    Connexion,
    Navigation,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

header {
  background-color: $dark;
}
#HeaderNav {
  @media (min-width: 576px) {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    border: none !important;
  }
}
</style>
