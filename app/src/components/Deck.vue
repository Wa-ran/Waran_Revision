<template>
  <div class="position-relative">
    <Card class="text-center shadow">
      <template v-slot:topRight>
        <ButtonTopRight
          :link="{ name: 'ModifDeck', params: { deck: deck.id } }"
          :title="'Modifier le deck'"
        />
      </template>

      <template v-slot:body>
        <div
          class="bg-body d-flex flex-column justify-content-start h-100 overflow-scroll"
        >
          <div
            class="d-flex flex-column justify-content-center align-items-center h-fit my-auto"
          >
            <!-- Title -->
            <h3 class="card-title h-fit mx-auto p-2">
              <cust-a
                :linkObj="{
                  name: 'DeckView',
                  params: { deck: deck.id },
                }"
                :linkText="deck.title || 'Deck sans titre'"
                class="link-current text-decoration-none shadow-none"
              />
            </h3>
            <!-- Description -->
            <p v-if="deck.text" class="card-text p-2" v-html="deck.text"></p>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div class="footer">
          <div class="mt-1 px-2">
            <button
              @click="
                $router.push({ name: 'Revision', params: { deck: deck.id } })
              "
              class="btn btn-primary w-fit w-100 px-3 py-0"
            >
              Réviser
            </button>

            <button
              @click="
                $router.push({ name: 'NewCard', params: { deck: deck.id } })
              "
              class="btn btn-outline-primary w-fit w-100 px-3 py-0 mt-2"
            >
              Nouvelle carte
            </button>

            <button
              @click="
                $router.push({ name: 'AllCards', params: { deck: deck.id } })
              "
              class="btn btn-outline-primary w-fit w-100 px-3 py-0 mt-2"
            >
              Voir mes cartes
            </button>
          </div>

          <cust-hr class="mt-2 mb-1" />

          <span v-if="deck.cards_total_number == 0">Aucune carte</span>
          <div v-else>
            <span v-if="deck.cards_to_revise == 0">Aucune carte à réviser</span>
            <span v-else>
              <span class="fw-bold">{{
                deck.sequence ? deck.cards_total_number : deck.cards_to_revise
              }}</span>
              cartes à reviser
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
      class="position-absolute w-100 h-100 border border-primary bg-dark sub-card"
      :class="sub == 3 - 1 ? 'card shadow' : 'card'"
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
.sub-card {
  border-radius: 0.5rem !important;
}
</style>
