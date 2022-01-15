<template>
  <div class="d-flex align-items-center w-100 ps-3">
    <ul class="navbar-nav">
      <li class="nav-item">
        <cust-a
          :linkName="'Library'"
          :linkText="'Mes Decks'"
          class="nav-link"
        />
      </li>
      <li class="nav-item">
        <cust-a :linkName="'Profil'" :linkText="'Profil'" class="nav-link" />
      </li>
      <li class="nav-item">
        <cust-a
          :linkName="'Disabled'"
          :linkText="'Disabled'"
          :disabled="true"
          class="nav-link disabled"
        />
      </li>
    </ul>
    <button
      type="button"
      @click="resetStore"
      class="btn btn-outline-primary h-fit ms-auto mb-auto mt-3 mb-md-0 mt-md-0"
    >
      Déconnexion
    </button>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  components: {},
  methods: {
    resetStore() {
      this.mutateKey("app", { actionDisconnect: true });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.dropdown a:focus {
  box-shadow: 0 0 0 0.25rem rgba($primary, 0.5);
}
button {
  @media (min-width: 576px) {
    margin-top: 0 !important;
  }
}
</style>
