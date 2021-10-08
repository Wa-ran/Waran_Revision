<template>
  <div>
    <div class="deck flex-grow-1" :key="cardsListLength">
      <Card @modifying="$emit('modifying', $event)" />
      <div
        v-for="card in cardsList.slice(0, 8)"
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
  async created() {
    await this.chargeDeck();
  },
  watch: {
    async cardsListLength() {
      if (this.cardsList) {
        setTimeout(() => {
          let cards = document.querySelectorAll(".sub_card");
          if (cards.length > 0) {
            for (let index of this.cardsList.keys()) {
              console.log("coucou");
              cards[index].style.cssText = `
              z-index: ${50 - index};
              transition: transform 0.2s 0.${index}s;
              transform:
              translateX(${-index * 3}px)
              translateY(${-index}px)
              rotateZ(${-index * 0.35}deg);`;
              if (index == 10 || index == cards.length - 1) break;
            }
          }
        });
      }
      if (this.cardsListLength == 0) {
        if (this.success) {
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
        } else {
          this.success = true;
          await this.chargeDeck();
        }
      } else this.success = false;
      this.$emit("modifying", false);
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
    margin-top: 0;
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
