<template>
  <div class="container-fluid flex-grow-1">
    <!-- Bouton retour -->
    <button
      v-if="prevRoute"
      @click="$router.push(prevRoute.path)"
      class="position-relative btn btn-outline-primary h-fit w-fit mb-3 ms-n3 py-1"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" size="lg" />
      <span class="px-2"> {{ prevRouteDesc }}</span>
    </button>

    <!-- View -->
    <router-view v-if="$route.name == 'ModifCard'" />
    <CardSummary v-else @submitted="$router.push(prevRoute.path)" class="p-0" />

    <!-- Bouton supprimer -->
    <DoubleCheckButton
      @checkedClick="deleteCard"
      class="btn ms-auto mt-2"
      :classDefault="'btn-danger'"
    >
      <template v-slot:default>
        <font-awesome-icon :icon="['fas', 'trash-alt']" />
        <span class="ms-2 flex-grow-1">Supprimer la carte</span>
      </template>
      <template v-slot:checked>
        <font-awesome-icon :icon="['fas', 'trash-alt']" />
        <span class="ms-2 flex-grow-1">Supprimer ?</span>
      </template>
    </DoubleCheckButton>
  </div>
</template>

<script>
import CardSummary from "@/components/CardSummary";
import card from "@/mixins/card";

export default {
  name: "CardView",
  components: {
    CardSummary,
  },
  data() {
    return {
      modalSetting: {
        title: "Quitter sans valider les changements ?",
        button: "Continuer",
      },
      prevRoute: null,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    prevRouteDesc() {
      let prevRoute = this.prevRoute ? this.prevRoute.name : null;
      switch (prevRoute) {
        case "Revision":
          return "Retourner réviser";
        case "Liste":
          return "Revenir à la liste de cartes";
        default:
          return null;
      }
    },
  },
  methods: {
    async deleteCard() {
      await this.$store
        .dispatch("deleteCard")
        .then(() => this.$router.push(this.prevRoute.path));
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  beforeRouteLeave(to, from, next) {
    if (
      JSON.stringify(this.actualCard) !==
      JSON.stringify(
        this.$store.state.cardsToReviseBaseList[this.actualCard.key]
      )
    ) {
      this.setModal(this.modalSetting);
      this.displayModal();
      const int = setInterval(() => {
        if (!this.$store.state.modalDisplay) {
          next(this.$store.state.modalAnswer);
          clearInterval(int);
        }
      }, 200);
      setTimeout(() => {
        int;
      }, 500);
    } else next();
  },
  mixins: [card],
};
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 500px;
}
</style>
