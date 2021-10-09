<template>
  <header>
    <div class="container">
      <div v-if="!stateUser.id" class="container">
        <button
          v-if="!displayForm"
          @click="displayForm = 'inscription'"
          :class="displayForm == 'inscription' ? 'default' : ''"
        >
          <span>Inscription</span>
        </button>
        <button
          v-if="!displayForm"
          @click="displayForm = 'connexion'"
          class="default"
        >
          <span>Connexion</span>
        </button>

        <div v-if="displayForm" class="container">
          <span v-if="displayForm == 'connexion'">Connexion :</span>
          <span v-else>Inscription :</span>
          <div class="multiButtons">
            <button @click="submitUser" class="default">
              <span>Valider</span>
            </button>
            <button @click="displayForm = false">
              <span>Annuler</span>
            </button>
          </div>
        </div>

        <form v-if="displayForm" class="container">
          <input v-model="pseudo" type="pseudo" placeholder="Pseudo" />
          <input v-model="password" type="password" placeholder="Password" />
        </form>
      </div>

      <div v-else class="container">
        <button @click="resetUser"><span>Déconnexion</span></button>
        <div>
          Bienvenue,
          <span style="font-weight: bold">{{ stateUser.pseudo }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      displayForm: false,
      pseudo: "",
      password: "",
    };
  },
  computed: {
    stateUser() {
      return this.$store.state.user;
    },
    stateUserId() {
      return this.$store.state.user.id;
    },
  },
  methods: {
    async submitUser() {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "user",
          body: {
            id: this.$store.state.user.id,
            pseudo: this.pseudo,
            password: this.password,
          },
        },
      });
      if (this.displayForm === "connexion")
        await this.$store.dispatch("getUser");
      else await this.$store.dispatch("postUser");
    },
    resetUser() {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "user",
          body: {},
        },
      });
    },
  },
  watch: {
    stateUserId() {
      this.$store.dispatch("mutateStore", {
        fct: "changeUser",
        value: this.stateUser,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  & > * {
    margin: auto 1rem auto 0;
  }
}
input {
  height: fit-content;
  width: 40%;
  max-width: 200px;
  padding: 0.25rem;
  border-bottom: solid 1px;
}

@media screen and (max-width: 767px) {
  .container {
    width: 100%;
    justify-content: center;
    & > * {
      margin: 0.25rem;
    }
    & span {
      margin-right: 1rem;
      margin-top: auto;
    }
  }
}
</style>
