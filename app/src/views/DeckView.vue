<template>
  <div class="w-100 w-sm-75 mx-auto px-sm-4">
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
    <div v-else>
      <cust-hr class="my-3 mx-auto w-50" />

      <p class="text-center ms-3">
        {{ actualDeck.text || "Pas de description." }}
      </p>

      <cust-hr class="my-3 mx-auto" />

      <div class="d-flex ms-3">
        <div>
          <p>
            {{ actualDeck.cards_to_revise || "Pas de" }}
            carte{{ actualDeck.cards_to_revise > 1 ? "s" : "" }} à réviser
          </p>
          <p>
            Total : {{ actualDeck.cards_total_number || 0 }} carte{{
              actualDeck.cards_total_number > 1 ? "s" : ""
            }}
          </p>

          <div v-if="actualDeck.sequence" class="d-flex">
            Deck séquencé
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

        <button
          @click="
            $router.push({
              name: 'ModifDeck',
              params: {
                deck: actualDeck.id,
              },
            })
          "
          class="btn btn-primary h-fit ms-auto mt-auto py-0"
        >
          Modifier
        </button>
      </div>

      <cust-hr class="my-3 mx-auto" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DeckView",
  computed: {
    actualDeck() {
      return this.$store.getters.actualDeck;
    },
  },
  mounted() {
    this.mutateApp("deckSelected", true);
  },
  unmounted() {
    this.mutateApp("deckSelected", false);
  },
};
</script>
