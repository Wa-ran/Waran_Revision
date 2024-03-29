<template>
  <form
    @change="change++"
    class="container-fluid border border-primary rounded py-2"
  >
    <div class="w-fit mx-auto">
      <span class="text-primary">Profil de : </span>
      <span class="bold fs-5 ms-1">{{ user.pseudo }}</span>
    </div>

    <cust-hr class="w-75 mx-auto" />
    <span class="text-primary">Pendant les révisions : </span>

    <div class="form-check mt-2 ms-3">
      <input
        v-model="user.hide_card"
        class="form-check-input"
        type="checkbox"
        id="hide_card"
        @click="mutateApp('cardHideCheck', $event)"
      />
      <label class="form-check-label" for="hide_card">
        Cacher les cartes
      </label>
    </div>

    <div class="form-check mt-2 ms-3">
      <input
        v-model="user.chrono_card"
        class="form-check-input"
        type="checkbox"
        id="chrono_card"
        @click="mutateApp('cardChronoCheck', $event)"
      />
      <label class="form-check-label" for="chrono_card">
        Afficher le chronomètre
      </label>
    </div>

    <div class="form-check d-flex mt-2 ms-3">
      <input
        v-model="user.fast_mode"
        class="form-check-input"
        type="checkbox"
        id="fast_mode"
        @click="mutateApp('cardFastCheck', $event)"
      />
      <label class="form-check-label ms-2" for="fast_mode"> Mode rapide </label>
      <cust-tooltip
        :text="'En révision les cartes s\'enchaîneront <span class=\'bold\'>rapidement</span>, sans pouvoir les modifier.'"
      />
    </div>

    <cust-hr class="w-25 me-auto" />

    <span class="text-primary">Création/modification : </span>

    <div class="form-check mt-2 ms-3">
      <input
        v-model="user.show_form_options"
        class="form-check-input"
        type="checkbox"
        id="show_form_options"
        @click="mutateApp('showFormOptions', $event)"
      />
      <label class="form-check-label" for="show_form_options">
        Toujours afficher les options supplémentaires
      </label>
    </div>

    <div class="form-check mt-2 ms-3">
      <input
        v-model="user.hide_form_modal"
        class="form-check-input"
        type="checkbox"
        id="hide_form_modal"
        @click="mutateApp('hideFormModal', $event)"
      />
      <label class="form-check-label" for="hide_form_modal">
        Ne pas me prévenir de changements non validés avant de quitter
      </label>
    </div>

    <cust-hr class="w-25 me-auto" />

    <span class="text-primary">Thème du site : </span>

    <div class="form-check mt-2 ms-3">
      <input
        v-model="default_mode"
        class="form-check-input"
        type="checkbox"
        id="default_mode"
        @click="
          user.dark_mode = null;
          verifEmpty($event);
        "
      />
      <label class="form-check-label" for="default_mode">
        Selon mon système (défaut)
      </label>
    </div>

    <div class="form-check mt-2 ms-3">
      <input
        v-model="light_mode"
        class="form-check-input"
        type="checkbox"
        id="light_mode"
        @click="
          user.dark_mode = false;
          verifEmpty($event);
        "
      />
      <label class="form-check-label" for="dark_mode"> Clair </label>
    </div>

    <div class="form-check mt-2 ms-3">
      <input
        v-model="dark_mode"
        class="form-check-input"
        type="checkbox"
        id="dark_mode"
        @click="
          user.dark_mode = true;
          verifEmpty($event);
        "
      />
      <label class="form-check-label" for="dark_mode"> Sombre </label>
    </div>

    <!-- Validation -->
    <div class="w-fit m-auto mt-3">
      <button
        @click.prevent="submitUser"
        class="btn h-fit mb-1 p-1 px-3"
        :class="hasChanged ? 'btn-primary' : 'btn-outline-primary disabled'"
      >
        Valider
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ModifUser",
  data() {
    return {
      user: null,
      change: 0,
      hasChanged: false,
    };
  },
  props: {
    exit: Boolean,
  },
  computed: {
    dark_mode() {
      return this.user.dark_mode === true;
    },
    default_mode() {
      return this.user.dark_mode === null;
    },
    light_mode() {
      return this.user.dark_mode === false;
    },
    stateUser() {
      return this.$store.state.user;
    },
    userChange() {
      return JSON.stringify(this.user);
    },
  },
  methods: {
    async submitUser() {
      await this.$store
        .dispatch("putUser", this.user)
        .then(() => this.mutateKey("user", this.user))
        .then(() => {
          this.change++;
          this.hasChanged = false;
        });
    },
    verifEmpty(event) {
      if (
        !document.getElementById("default_mode").checked &&
        !document.getElementById("light_mode").checked &&
        !document.getElementById("dark_mode").checked
      ) {
        event.target.checked = true;
      }
    },
    beforeExit() {
      this.mutateKey("formCompare", {
        source: { ...this.stateUser },
        modified: this.user,
      });
    },
  },
  created() {
    this.user = { ...this.stateUser };
  },
  mounted() {
    if (this.user.dark_mode === null) this.default_mode = true;
    else this.default_mode = false;
  },
  watch: {
    change() {
      this.mutateApp("darkMode", this.user.dark_mode);
    },
    exit() {
      if (this.exit) this.beforeExit();
    },
    userChange() {
      if (JSON.stringify(this.user) !== JSON.stringify(this.stateUser))
        this.hasChanged = true;
      else this.hasChanged = false;
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 400px;
}
</style>
