<template>
  <div class="container-fluid flex-grow-1">
    <!-- View -->
    <router-view v-if="$route.name == 'ModifCard'" class="px-0" />
    <CardSummary v-else class="p-0" />

    <!-- Bouton supprimer -->
    <DoubleCheckButton
      @checkedClick="deleteCard"
      class="btn ms-auto mt-2 me-n2"
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
  // see Aside
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.from = from;
    });
  },
  mixins: [card],
};
</script>

<style lang="scss" scoped>
.container-fluid {
  max-width: 500px;
}
</style>
