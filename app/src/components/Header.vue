<template>
  <header @click.prevent="handleFocus" class="container-fluid dark shadow">
    <nav
      class="navbar navbar-expand-lg navbar-dark justify-content-end p-1"
      :class="!user.id ? 'flex-nowrap' : ''"
    >
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

      <div
        v-if="!user.id"
        class="my-auto"
        :class="connect ? 'mx-auto' : 'ms-auto'"
      >
        <Connexion @displayForm="connect = true" @hidenForm="connect = false" />
      </div>

      <div
        v-if="user.id"
        class="d-flex align-items-center border-end border-primary my-0 ms-0 py-2 px-3 me-auto mx-3"
      >
        <h2 class="fs-4 text-white m-0">{{ title }}</h2>
      </div>

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

      <div
        v-if="user.id"
        class="collapse navbar-collapse border-top border-primary mt-3"
        id="HeaderNav"
      >
        <Navigation class="navigation" />
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
  data() {
    return {
      connect: false,
      focus: false,
    };
  },
  computed: {
    title() {
      let route = this.$route.name;
      switch (route) {
        case "Home":
          return "Accueil";
        case "Library":
          return "Vos decks";
        case "DeckView":
          return "Deck";
        case "ModifDeck":
          return "Modifier un deck";
        case "Revision":
          return "Révision";
        case "CardView":
          return "Carte";
        case "ModifCard":
          return "Modifier une carte";
        case "Profil":
          return "Profil";
        default:
          return "";
      }
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    handleFocus() {
      this.focus = true;
      setTimeout(() => {
        this.focus = false;
      }, 100);
    },
  },
  mounted() {
    document.getElementById("app").addEventListener("click", () => {
      let test = document.querySelector("#HeaderNav.navbar-collapse.show");
      if (!this.focus && test) this.hideNavbar();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.hideNavbar();
    next();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

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
  @media (min-width: 992px) {
    display: none !important;
  }
}
</style>
