<template>
  <div class="container-fluid">
    <router-view v-if="$route.name == 'ModifCard'" />
    <div v-else>
      <span class="text-primary">{{
        actualCard.reverse ? "Recto :" : "Question"
      }}</span>
      <div v-html="actualCard.recto" class="px-3 mb-3"></div>

      <span class="text-primary">{{
        actualCard.reverse ? "Verso :" : "Réponse"
      }}</span>
      <div v-html="actualCard.verso" class="px-3 mb-3"></div>
      <cust-hr class="w-75 mx-auto" />

      <span v-if="actualCard.comment" class="text-primary">Commentaire :</span>
      <span v-else class="text-primary">Pas de commentaire</span>
      <div v-html="actualCard.comment" class="px-3 mb-3"></div>

      <cust-hr class="w-75 mx-auto" />
      <div class="mb-2">
        <span class="text-primary">Niveau :&nbsp;&nbsp;</span>
        <span class="bold">{{ mixShowLevel(actualCard) }}</span>
        <span class="italic"
          >&nbsp;&nbsp;(révision ~ {{ mixShowRevision(actualCard) }})</span
        >
      </div>

      <div v-if="prevRoute && prevRoute.name == 'Revision'" class="mb-2">
        <span class="text-primary">Révision :&nbsp;&nbsp;</span>
        <span v-if="actualCard.win == false">Perdue</span>
        <span v-else-if="actualCard.win == null">Presque</span>
        <span v-else>Gagnée</span>
      </div>

      <div class="mb-2">
        <span class="text-primary">Deck :&nbsp;&nbsp;</span>
        <span>{{ mixShowDeck(actualCard) }}</span>
      </div>

      <!-- Buttons -->
      <div class="w-fit ms-auto mt-3">
        <cust-title
          id="modifCardButton"
          :text="'Modifier la carte'"
          class="w-fit ms-auto"
        >
          <template v-slot:default>
            <button
              @click="
                $router.push({
                  name: 'ModifCard',
                  params: {
                    card: actualCard.id,
                  },
                })
              "
              aria-labelledby="modifCardButton"
              class="position-relative btn btn-outline-primary h-fit w-fit p-1"
            >
              <font-awesome-icon :icon="['fas', 'cog']" size="lg" />
            </button>
          </template>
        </cust-title>

        <button
          @click="submitCard"
          class="btn btn-primary h-fit w-fit mt-2 py-0 fs-5"
        >
          Valider
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/mixins/card";

export default {
  name: "CardView",
  data() {
    return {
      prevRoute: null,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
  },
  methods: {
    async submitCard() {
      await this.$store
        .dispatch("putCard", this.actualCard)
        .then(() => this.$router.push(this.prevRoute.path));
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  mixins: [card],
};
</script>

<style lang="scss" scoped>
.container-fluid {
  width: 80vw;
}
</style>
