<template>
  <header class="container-fluid dark shadow">
    <nav
      class="navbar navbar-expand-lg navbar-dark justify-content-end p-1"
      :class="!user.id ? 'flex-nowrap' : ''"
    >
      <div
        v-if="!connect || user.id"
        class="border-end border-primary my-0 ms-0 py-2"
      >
        <cust-a
          :linkName="'Home'"
          :linkText="this.user.pseudo ? this.user.pseudo : 'Revision'"
          class="navbar-brand m-0 pe-3 py-0 text-primary"
        />
      </div>

      <div class="my-auto" :class="connect || user.id ? 'me-auto' : 'ms-auto'">
        <Connexion
          v-if="!user.id"
          @displayForm="connect = true"
          @hidenForm="connect = false"
        />
        <h2 v-else class="m-0 mx-3 fs-4">{{ title }}</h2>
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
        class="collapse navbar-collapse border-top border-primary mt-2 ms-lg-5 ps-lg-5"
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
    };
  },
  computed: {
    title() {
      let route = this.$route.name;
      switch (route) {
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
          return "Modifer une carte";
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
