<template>
  <div class="position-relative">
    <Card class="position-relative text-center shadow">
      <template v-slot:body>
        <div class="bg-body position-absolute top-0 end-0 m-2">
          <button
            type="button"
            @click="
              $router.push({ name: 'DeckView', params: { deck: deck.id } })
            "
            class="has-icon btn btn-outline-primary p-0"
          >
            <font-awesome-icon :icon="['fas', 'cog']" size="lg" />
          </button>
        </div>

        <div class="bg-body d-flex flex-column flex-grow-1 h-100">
          <div
            class="
              d-flex
              flex-column
              justify-content-center
              align-self-center
              h-100
            "
          >
            <h3 class="card-title h-fit mx-auto p-2">
              {{ deck.title || "Votre Deck" }}
            </h3>
            <p v-if="deck.text" class="card-text h-fit p-2">
              {{ deck.text }}
            </p>
          </div>
          <button
            @click="
              $router.push({ name: 'Revision', params: { deck: deck.id } })
            "
            class="btn btn-primary w-fit mx-auto px-3 py-0"
          >
            Réviser
          </button>
        </div>
      </template>
      <template v-slot:footer>
        <div class="footer">
          <span v-if="deck.cards_total_number == 0">Aucune carte</span>
          <div v-else>
            <span v-if="deck.cards_to_revise == 0">Aucune carte à réviser</span>
            <span v-else>
              <span class="fw-bold">{{ deck.cards_to_revise }}</span> cartes à
              reviser
            </span>
          </div>
        </div>
      </template>
    </Card>
    <div
      v-for="sub of 3"
      :key="sub"
      :style="`opacity: ${1 - sub / 3};
      top: ${5 * sub}px;
      left: ${5 * sub}px;
      z-index: ${10 - sub}`"
      class="
        position-absolute
        w-100
        h-100
        border border-primary
        rounded
        bg-body
      "
      :class="sub == 3 - 1 ? 'card sub_card shadow' : 'card sub_card'"
    ></div>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "Deck",
  components: {
    Card,
  },
  props: {
    deck: Object,
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 13rem;
  height: 18rem;
  z-index: 10;
}
.has-icon {
  width: 1.7rem;
  height: 1.7rem;
  & > * {
    width: 80%;
    height: 80%;
  }
}
.footer {
  font-size: 0.9rem;
}
</style>
