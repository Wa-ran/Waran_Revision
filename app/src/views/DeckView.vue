<template>
  <div class="container-fluid">
    <div
      class="DeckView position-relative w-fit mx-auto px-sm-4 p-3"
      :class="
        $route.name === 'DeckView' ? 'border border-primary rounded' : 'pt-0'
      "
    >
      <ButtonTopRight
        v-if="$route.name == 'DeckView'"
        :link="{
          name: 'ModifDeck',
          params: {
            deck: actualDeck.id,
          },
        }"
        :title="'Modifier le deck'"
      />
      <!-- Title -->
      <div class="d-flex justify-content-center">
        <h2 class="d-flex justify-content-center w-100 m-0">
          <cust-a
            :linkObj="{
              name: 'DeckView',
              params: { deck: $route.params.deck },
            }"
            :linkText="actualDeck.title || 'Votre deck'"
            class="btn btn-link fs-2 py-0 text-decoration-none"
          />
        </h2>
      </div>

      <!-- View -->
      <div v-if="$route.name !== 'DeckView'" class="m-auto">
        <router-view />
      </div>

      <!-- Summary -->
      <div v-else class="summary">
        <cust-hr class="my-3 mx-auto w-50" />

        <p
          class="text-center"
          v-html="actualDeck.text || 'Pas de description.'"
        ></p>

        <cust-hr class="my-3 mx-auto" />

        <div class="d-flex">
          <div class="w-100">
            <p class="text-center">
              <span :class="actualDeck.cards_to_revise ? 'fw-bold' : ''">{{
                actualDeck.cards_to_revise || "Pas de"
              }}</span>
              carte{{ actualDeck.cards_to_revise > 1 ? "s" : "" }} à réviser
            </p>
            <p v-if="!actualDeck.sequence">
              Total : {{ actualDeck.cards_total_number || 0 }} carte{{
                actualDeck.cards_total_number > 1 ? "s" : ""
              }}
            </p>
            <p v-else>
              Niveau : <span class="fw-bold">{{ actualDeck.min_level }}</span>
              <br />
              (<span class="fst-italic"
                >révision
                {{ mixShowRevision({ level: actualDeck.min_level }) }}</span
              >)
            </p>

            <div v-if="actualDeck.sequence" class="d-flex">
              Deck ordonné
              <cust-tooltip
                :text="'Les cartes sont liées et se révisent dans l\'ordre.'"
              />
            </div>
            <div v-else class="d-flex">
              Deck aléatoire
              <cust-tooltip
                :text="'Les cartes sont indépendantes, elles apparaissent de manière aléatoire.'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="$route.name === 'DeckView'"
      class="d-flex flex-row flex-wrap justify-content-center align-items-center mt-3"
    >
      <div class="w-100">
        <button
          @click="$router.push({ name: 'Revision' })"
          class="btn btn-primary h-fit w-fit mx-auto px-3 py-0 mt-2"
        >
          Réviser
        </button>
      </div>

      <button
        @click="$router.push({ name: 'NewCard' })"
        class="btn btn-outline-primary h-fit w-fit mx-2 px-3 py-0 mt-2"
      >
        Nouvelle carte
      </button>

      <button
        @click="$router.push({ name: 'AllCards' })"
        class="btn btn-outline-primary h-fit w-fit mx-2 px-3 py-0 mt-2"
      >
        Voir mes cartes
      </button>
    </div>
  </div>
</template>

<script>
import card from "@/mixins/card";

export default {
  name: "DeckView",
  computed: {
    actualDeck() {
      return this.$store.state.actualDeck;
    },
  },
  mounted() {
    this.mutateApp("deckSelected", true);
  },
  unmounted() {
    this.mutateApp("deckSelected", false);
  },
  mixins: [card],
};
</script>

<style lang="scss" scoped>
.container-fluid {
  min-width: 300px;
}
.summary {
  min-width: 200px;
  max-width: 300px;
}
</style>
