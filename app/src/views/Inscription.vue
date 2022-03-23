<template>
  <form
    class="d-flex flex-column justify-content-center align-items-center p-5"
  >
    <h2 class="fs-1 fst-italic">...ninja...</h2>
    <div class="d-flex mt-5">
      <div>
        <label for="Pseudo" class="form-label aria-only">
          Nom d'utilisateur
        </label>
        <input
          type="text"
          v-model="pseudo"
          class="form-control border-primary"
          placeholder="Pseudo"
          id="Pseudo"
        />
      </div>
      <div>
        <label for="Password" class="form-label aria-only">
          Mot de passe
        </label>
        <input
          type="password"
          v-model="password"
          class="form-control border-primary"
          placeholder="Password"
          id="Password"
        />
      </div>
    </div>

    <div class="d-flex m-5">
      <button @click="submitForm" type="button" class="btn btn-primary ms-2">
        Envoyer
      </button>
      <button
        @click.prevent="$router.go(-1)"
        type="button"
        class="btn btn-outline-primary"
      >
        <font-awesome-icon :icon="['fas', 'times']" size="lg" />
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Inscription",
  data() {
    return {
      pseudo: null,
      password: null,
    };
  },
  methods: {
    submitForm() {
      if (!this.pseudo) document.getElementById("Pseudo").focus();
      else if (!this.password) document.getElementById("Password").focus();
      else this.submitUser();
    },
    async submitUser() {
      this.mutateKey("user", {
        pseudo: this.pseudo,
        password: this.password,
      });

      await this.$store
        .dispatch("postUser")
        .then(() => this.$router.push({ name: "Home" }));
    },
  },
};
</script>
