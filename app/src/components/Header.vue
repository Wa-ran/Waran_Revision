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
            <button @click="displayForm = false">
              <span>Annuler</span>
            </button>
            <button @click="submitUser" class="default">
              <span>Valider</span>
            </button>
          </div>
        </div>

        <form v-if="displayForm" class="container">
          <input
            v-model="pseudo"
            placeholder="Pseudo"
            autocomplete="username"
            @change="autofillTest"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            autocomplete="current-password"
            @change="autofillTest"
          />
        </form>
      </div>

      <div v-else class="container">
        <button @click="resetUser"><span>Déconnexion</span></button>
        <div class="welcome">
          <div>
            Bienvenue,
            <span style="font-weight: bold">{{ stateUser.pseudo }}</span>
          </div>
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
      autofill: 0,
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
    autofillTest(event) {
      if (this.autofill === 0) this.autofill = event.timeStamp;
      else if (event.timeStamp - this.autofill < 200) {
        this.autofill = 0;
        if (this.pseudo && this.password) this.submitUser();
      } else this.autofill = 0;
    },
    async submitUser() {
      this.mutateKey("user", {
        id: this.$store.state.user.id,
        pseudo: this.pseudo,
        password: this.password,
      });

      if (this.displayForm === "connexion")
        await this.$store.dispatch("getUser");
      else {
        await this.$store.dispatch("postUser").then(() => {
          this.$store.dispatch("getUser");
          // alert("Inscription réussie !");
        });
        this.autofill = 0;
      }
    },
    resetUser() {
      this.$store.dispatch("mutateStore", {
        fct: "resetKey",
        value: "user",
      });
    },
  },
  watch: {
    // displayForm() {
    // setTimeout(() => {
    //   document
    //     .querySelector("header input[type = 'password']")
    //     .addEventListener("animationstart", (e) => {
    //       if (e.animationName.match(/onAutoFillStart/)) {
    //         return this.submitUser();
    //       } else if (e.animationName.match(/onAutoFillCancel/)) return;
    //     });
    // });
    // }
    // },
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
  & .welcome {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    & > * {
      height: fit-content;
      margin: auto 0.25rem;
    }
  }
}
input {
  height: fit-content;
  width: 40%;
  max-width: 200px;
  padding: 0.25rem;
  border-bottom: solid 1px;

  //   &[type="password"] {
  //     &:-webkit-autofill {
  //       // Expose a hook for JavaScript when auto fill is shown.
  //       // JavaScript can capture 'animationstart' events
  //       animation-name: onAutoFillStart;
  //     }

  //     &:not(:-webkit-autofill) {
  //       // Expose a hook for JS onAutoFillCancel
  //       // JavaScript can capture 'animationstart' events
  //       animation-name: onAutoFillCancel;
  //     }
  //   }
  // }
  // @keyframes onAutoFillStart {
  //   from {
  //     /**/
  //   }
  //   to {
  //     /**/
  //   }
  // }
  // @keyframes onAutoFillCancel {
  //   from {
  //     /**/
  //   }
  //   to {
  //     /**/
  //   }
}

@media screen and (max-width: 767px) {
  .container {
    width: 100%;
    justify-content: center;
    & > *:not(button) {
      margin: 0.25rem;
    }
    & span {
      margin-right: 1rem;
      margin-top: auto;
    }
  }
}
</style>
