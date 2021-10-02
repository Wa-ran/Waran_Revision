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
    cardsListLength() {
      console.log(document.body.clientWidth);
      if (document.body.clientWidth > 767) {
        setTimeout(() => {
          let cards = document.querySelectorAll(".sub_card");
          for (let index of this.cardsList.keys()) {
            cards[index].style.cssText = `
          z-index: ${6 - index};
          transition: transform 0.2s;
          transform:
          translateX(${-index * 6}px)
          translateY(${-index * 2}px)
          rotateZ(${-index * 0.7}deg);`;
            if (index == 5) break;
          }
        });
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
    min-width: 300px;
    min-height: 500px;
    margin: auto;

    position: absolute;
  }
}

.deckManager {
  width: 100%;
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
  .sub_card {
    display: none;
  }
}
</style>
