<template>
  <form @change="change++" class="container-fluid">
    <div class="w-fit mx-auto">
      <span class="text-primary">Profil de : </span>
      <span class="bold fs-5">{{ user.pseudo }}</span>
    </div>

    <cust-hr class="w-75 mx-auto" />
    <span class="text-primary">Vos préférences : </span>

    <div class="form-check mt-2 ms-3">
      <input
        v-model="user.hide_card"
        class="form-check-input"
        type="checkbox"
        id="hide_card"
        @click="mutateApp('cardHideCheck', $event)"
      />
      <label class="form-check-label" for="hide_card">
        Cacher les cartes <span class="italic">(pendant les révisions)</span>
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
        <span class="italic">(pendant les révisions)</span>
      </label>
    </div>

    <div class="form-check d-flex mt-2 ms-3">
      <input
        v-model="user.fast_mode"
        class="form-check-input"
        type="checkbox"
        id="fast_mode"
        @click="mutateApp('fastMode', $event)"
      />
      <label class="form-check-label ms-2" for="fast_mode"> Mode rapide </label>
      <cust-tooltip
        :text="'Pendant les révisions, les cartes s\'enchaînent rapidement, <span class=\'bold\'>mais vous ne pouvez pas les modifiers</span>.'"
      />
    </div>

    <cust-hr class="w-25 me-auto" />

    <div class="form-check mt-2 ms-3">
      <input
        v-model="light_mode"
        class="form-check-input"
        type="checkbox"
        id="dark_mode"
        @click="
          mutateApp('darkMode', false);
          user.dark_mode = false;
          default_mode = false;
        "
      />
      <label class="form-check-label" for="dark_mode">
        Mode jour par défaut
      </label>
    </div>

    <div class="form-check mt-2 ms-3">
      <input
        v-model="user.dark_mode"
        class="form-check-input"
        type="checkbox"
        id="dark_mode"
        @click="
          mutateApp('darkMode', true);
          light_mode = false;
          default_mode = false;
        "
      />
      <label class="form-check-label" for="dark_mode">
        Mode nuit par défaut
      </label>
    </div>

    <div class="form-check mt-2 ms-3">
      <input
        v-model="default_mode"
        class="form-check-input"
        type="checkbox"
        id="default_mode"
        @click="
          mutateApp('darkMode', null);
          light_mode = false;
          user.dark_mode = null;
        "
      />
      <label class="form-check-label" for="default_mode">
        Suivre mes préférences système (défaut)
      </label>
    </div>

    <!-- Validation -->
    <div class="w-fit ms-auto mt-3">
      <button
        @click.prevent="submitUser"
        class="position-relative btn btn-primary h-fit p-1 px-3"
        :class="hasChanged ? '' : 'disabled'"
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
      default_mode: true,
      light_mode: null,
      user: null,
      change: 0,
      hasChanged: false,
    };
  },
  computed: {
    stateUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async submitUser() {
      await this.$store
        .dispatch("putUser", this.user)
        .then(() => {
          this.mutateKey("user", { ...this.user });
        })
        .then(() => this.$router.push({ name: "Profil" }))
        .then(() => this.change++);
    },
  },
  created() {
    this.user = { ...this.stateUser };
  },
  watch: {
    change() {
      if (JSON.stringify(this.user) !== JSON.stringify(this.stateUser))
        this.hasChanged = true;
      else this.hasChanged = false;
    },
  },
};
</script>
