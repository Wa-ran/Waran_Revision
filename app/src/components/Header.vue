<template>
  <header
    class="container-fluid bg-dark shadow-sm"
    :class="darkMode ? 'dark' : 'light'"
  >
    <nav
      class="navbar navbar-expand-lg justify-content-end p-1"
      :class="navbarClasses"
    >
      <!-- User pseudo -->
      <div
        v-if="!connect || user.id"
        class="d-flex align-items-center border-end border-primary my-0 ms-0 py-2"
      >
        <cust-a
          :linkObj="{ name: 'Home' }"
          :linkText="this.user.pseudo ? this.user.pseudo : 'Revision'"
          class="navbar-brand m-0 pe-3 py-0 text-primary"
        />
      </div>

      <!-- Connexion form -->
      <div
        v-if="!user.id"
        class="my-auto"
        :class="connect ? 'mx-auto' : 'ms-auto'"
      >
        <Connexion @displayForm="connect = true" @hidenForm="connect = false" />
      </div>

      <!-- Current page desc -->
      <div
        v-if="user.id"
        class="d-flex align-items-center border-end border-primary my-0 ms-0 py-2 px-3 me-auto mx-3"
      >
        <h2 class="fs-4 text-white m-0">{{ title }}</h2>
      </div>

      <!-- Toogle nav -->
      <button
        v-if="user.id"
        class="navbar-toggler btn btn-outline-primary shadow-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#HeaderNav"
        aria-controls="HeaderNav"
        aria-expanded="false"
        aria-label="Accéder à la navigation"
      >
        <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
      </button>

      <!-- Main navigation -->
      <div
        v-if="user.id"
        class="collapse navbar-collapse border-top border-primary mt-3"
        id="HeaderNav"
      >
        <Navigation class="navigation" />
      </div>
    </nav>

    <!-- Breadcrumb -->
    <BreadCrumb v-if="user.id" class="border-top border-primary" />
  </header>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb";
import Connexion from "@/components/Connexion";
import Navigation from "@/components/Navigation";

export default {
  name: "Header",
  components: {
    BreadCrumb,
    Connexion,
    Navigation,
  },
  data() {
    return {
      connect: false,
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.app.darkMode;
    },
    navbarClasses() {
      let classes = "";
      if (!this.user.id) classes += "flex-nowrap";
      if (this.darkMode) classes += "navbar-dark";
      else classes += "navbar-light";
      return classes;
    },
    title() {
      return this.$route.meta.desc;
    },
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    document.getElementById("app").addEventListener("click", () => {
      let test = document.querySelector("#HeaderNav.navbar-collapse.show");
      if (test) this.hideNavbar();
    });
  },
  watch: {
    $route() {
      setTimeout(() => {
        let test = document.querySelector("#HeaderNav.navbar-collapse.show");
        if (test) this.hideNavbar();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

header {
  background-color: $dark;
}
.navigation {
  min-width: 100%;
}
#HeaderNav {
  @media (min-width: 992px) {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    border: none !important;
  }
}
.navbar-toggler {
  border-color: $primary;
  @media (min-width: 992px) {
    display: none !important;
  }
}
</style>
