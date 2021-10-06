<template>
  <div>
    <div class="deck flex-grow-1" :key="cardsListLength">
      <Card @modifying="$emit('modifying', $event)" />
      <div
        v-for="card in cardsList.slice(0, 5)"
        :key="card"
        class="card sub_card"
      ></div>
    </div>

    <div class="deckManager">
      <div>
        <button @click="createCard"><span>Nouvelle carte</span></button>
      </div>
      <div>
        <button v-if="cardsListLength > 0" @click="shiftCard">
          <span>Passer la carte</span>
        </button>
      </div>
      <div>
        <button @click="chargeDeck">
          <span>Recharger le deck</span>
        </button>
      </div>
      <div>
        <button @click="deleteCard" class="importantButton">
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
          <span class="flex-grow-1">Supprimer la carte</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import cardInclination from "@/mixins/cardInclination.vue";
import Card from "@/components/Card.vue";

export default {
  name: "Deck",
  components: {
    Card,
  },
  data() {
    return {
      success: false,
    };
  },
  computed: {
    actualCardId() {
      return this.$store.state.actualCard.id;
    },
    cardsList() {
      return this.$store.state.cardsList;
    },
    cardsListLength() {
      return this.cardsList.length;
    },
  },
  methods: {
    async chargeDeck() {
      if (this.$store.state.tagsSelectedList.length > 0)
        await this.$store.dispatch("getCardsToReviseByTags");
      else await this.$store.dispatch("getCardsToRevise");
    },
    createCard() {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "cardsList",
          body: this.$store.state.newCard,
        },
      });
    },
    async deleteCard() {
      await this.$store.dispatch("deleteCard");
    },
    shiftCard() {
      this.$store.dispatch("mutateStore", {
        fct: "shiftKey",
        value: "cardsList",
      });
    },
  },
  async mounted() {
    await this.chargeDeck();
  },
  watch: {
    async cardsListLength() {
      if (this.cardsList) {
        let weight = 1;
        if (document.body.clientWidth > 767) weight++;
        setTimeout(() => {
          let cards = document.querySelectorAll(".sub_card");
          if (cards.length > 0) {
            for (let index of this.cardsList.keys()) {
              cards[index].style.cssText = `
              z-index: ${6 - index};
              transition: transform 0.2s;
              transform:
              translateX(${-index * 3 * weight}px)
              translateY(${-index * weight}px)
              rotateZ(${-index * 0.35 * weight}deg);`;
              if (index == 4) break;
            }
          }
        });
      }
      if (this.cardsListLength == 0) {
        if (this.success) {
          setTimeout(() => {
            this.$store.dispatch("mutateStore", {
              fct: "mutateKey",
              value: {
                mutate: "cardsList",
                body: {
                  recto: "Le deck est vide. Félicitation !",
                  end: true,
                },
              },
            });
            this.success = false;
          }, 200);
        } else {
          this.success = true;
          await this.chargeDeck();
        }
      }
    },
  },

  // mixins: [cardInclination],
};
</script>

<style lang="scss" scoped>
.deck {
  width: 100%;
  min-height: 500px;
  margin: auto;
  margin-top: 2rem;

  display: flex;
  justify-content: center;
  align-content: center;

  & .card {
    min-height: 500px;
    margin: auto;

    position: absolute;
  }
}

.deckManager {
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > div {
    flex-grow: 1;
    margin: 0.5rem 0.25rem;
  }
  & button {
    width: 100%;
    margin: auto;
  }
}

@media screen and (max-width: 767px) {
  .deck {
    margin: auto;
  }
}
</style>
