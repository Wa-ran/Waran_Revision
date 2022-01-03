<template>
  <div class="d-flex w-100">
    <ul class="navbar-nav">
      <li class="nav-item">
        <cust-a
          :linkName="'Library'"
          :linkText="'Mes Decks'"
          class="nav-link"
        />
      </li>
      <li class="nav-item">
        <cust-a
          :linkName="'Profil'"
          :linkText="'Profil'"
          :disabled="true"
          class="nav-link disabled"
        />
      </li>
      <li class="nav-item">
        <cust-a
          :linkName="'Disabled'"
          :linkText="'Disabled'"
          :disabled="true"
          class="nav-link disabled"
        />
      </li>
      <li class="dropdown">
        <div class="dropdown position-relative">
          <button
            class="nav-link dropdown-toggle text-decoration-none"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            tabindex="1"
          >
            Options de révision
          </button>
          <div
            class="dropdown-menu dropdown-menu-dark position-absolute ms-3"
            aria-labelledby="dropdownMenuButton2"
          >
            <Options />
          </div>
        </div>
      </li>
    </ul>
    <button
      type="button"
      @click="resetStore"
      class="btn btn-outline-primary h-fit ms-auto mb-auto mt-2"
    >
      Déconnexion
    </button>
  </div>
</template>

<script>
import Options from "@/components/Options";

export default {
  name: "Navigation",
  components: {
    Options,
  },
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
