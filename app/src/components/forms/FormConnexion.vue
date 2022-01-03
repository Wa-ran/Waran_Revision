<template>
  <form class="d-flex">
    <div>
      <label for="ConnexionPseudo" class="form-label aria-only">
        Nom d'utilisateur
      </label>
      <input
        type="text"
        v-model="pseudo"
        class="form-control border-primary"
        placeholder="Pseudo"
        autocomplete="username"
        id="ConnexionPseudo"
        @change="autofillTest"
      />
    </div>
    <div>
      <label for="ConnexionPassword" class="form-label aria-only">
        Mot de passe
      </label>
      <input
        type="password"
        v-model="password"
        class="form-control border-primary"
        placeholder="Password"
        autocomplete="current-password"
        id="ConnexionPassword"
        @change="autofillTest"
      />
    </div>
    <div>
      <button @click="submitForm" type="button" class="btn btn-primary ms-2">
        Envoyer
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormConnexion",
  data() {
    return {
      autofill: 0,
      pseudo: null,
      password: null,
    };
  },
  methods: {
    autofillTest(event) {
      if (this.autofill === 0) this.autofill = event.timeStamp;
      else if (event.timeStamp - this.autofill < 200) {
        this.autofill = 0;
        if (this.pseudo && this.password) this.submitUser();
      } else this.autofill = 0;
    },
    submitForm() {
      if (!this.pseudo)
        document.querySelector("header input[placeholder='Pseudo']").focus();
      else if (!this.password)
        document.querySelector("header input[placeholder='Password']").focus();
      else this.submitUser();
    },
    async submitUser() {
      this.mutateKey("user", {
        id: this.$store.state.user.id,
        pseudo: this.pseudo,
        password: this.password,
      });

      await this.$store.dispatch("getUserByPseudo");
      this.autofill = 0;
    },
  },
};
</script>
