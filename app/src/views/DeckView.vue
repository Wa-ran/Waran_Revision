<template>
  <div class="w-100 w-sm-75 mx-auto px-sm-4">
    <div class="d-flex justify-content-center">
      <h2 class="d-flex justify-content-center w-100">
        <div>
          {{ actualDeck.title || "Votre deck" }}
        </div>
      </h2>
    </div>

    <div v-if="$route.name !== 'DeckView'" class="m-auto">
      <router-view />
    </div>

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
            carte{{ actualDeck.cards_to_revise > 1 ? "s" : "" }} à réviser.
          </p>
          <p>
            Total : {{ actualDeck.cards_total_number || 0 }} carte{{
              actualDeck.cards_total_number > 1 ? "s" : ""
            }}.
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
              name: 'DeckModification',
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
    this.mutateApp("deckCharged", true);
  },
  unmounted() {
    this.mutateApp("deckCharged", false);
  },
};
</script>
