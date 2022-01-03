<template>
  <div class="d-flex w-100">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Mes Decks</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown link
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li>
            <a class="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
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
export default {
  name: "Navigation",
  methods: {
    resetStore() {
      this.mutateKey("app", { actionDisconnect: true });
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  @media (min-width: 576px) {
    margin-top: 0 !important;
  }
}
</style>
