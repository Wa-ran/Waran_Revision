<template>
  <div class="container-fluid flex-grow-1">
    <!-- View -->
    <router-view
      v-if="$route.name == 'ModifCard'"
      class="px-0"
      :key="actualCardChange"
    />
    <CardSummary v-else class="p-0" :key="actualCardChange" />
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
    actualCardChange() {
      return this.$store.state.app.actualCardChange;
    },
    positionSaved() {
      return this.$store.state.app.positionSaved;
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
