<template>
  <div class="container-fluid flex-grow-1">
    <!-- View -->
    <router-view v-if="$route.name == 'ModifCard'" />
    <CardSummary
      v-else
      @submitted="$router.push(positionSaved.path)"
      class="p-0"
    />

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
      from: null,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    positionSaved() {
      return this.$store.state.app.positionSaved;
    },
  },
  methods: {
    async deleteCard() {
      await this.$store
        .dispatch("deleteCard")
        .then(() => this.$router.push(this.positionSaved.path));
    },
  },
  mounted() {
    this.mutateApp("positionSaved", this.from);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.from = from;
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
