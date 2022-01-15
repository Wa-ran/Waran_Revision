<template>
  <form class="d-flex">
    <div class="d-flex">
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
    </div>

    <div class="d-flex ms-auto">
      <button @click="submitForm" type="button" class="btn btn-primary ms-2">
        Envoyer
      </button>
      <button
        @click.prevent="$emit('close')"
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
      if (!this.pseudo) document.getElementById("ConnexionPseudo").focus();
      else if (!this.password)
        document.getElementById("ConnexionPassword").focus();
      else this.submitUser();
    },
    async submitUser() {
      this.mutateKey("user", {
        pseudo: this.pseudo,
        password: this.password,
      });

      await this.$store.dispatch("getUserByPseudo");
      this.$emit("close");
      this.autofill = 0;
    },
  },
};
</script>
