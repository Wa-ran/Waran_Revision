<template>
  <div class="container">
    <div class="deck flex-grow-1" :key="cardsListLength">
      <Card />
      <div
        v-for="card in cardsList.slice(0, 8)"
        :key="card"
        class="card sub_card"
      ></div>
    </div>

    <div v-if="!isModifying" class="deckManager">
      <div v-if="actualCardId">
        <button @click="createCard"><span>Nouvelle carte</span></button>
      </div>
      <div v-if="cardsListLength > 0">
        <button @click="shiftCard">
          <span>Passer la carte</span>
        </button>
      </div>
      <div>
        <button @click="chargeDeck">
          <span>Recharger le deck</span>
        </button>
      </div>
      <div v-if="actualCardId">
        <DoubleCheckButton @checkedClick="deleteCard" class="importantButton">
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
          <span class="flex-grow-1">Supprimer la carte</span>
        </DoubleCheckButton>
      </div>
    </div>

    <div v-else class="deckManager">
      <div>
        <button v-if="!actualCardId" @click="shiftCard">
          <span>Annuler</span>
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
      hasRevised: false,
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
    isModifying() {
      return this.$store.state.modifCard;
    },
  },
  methods: {
    async chargeDeck() {
      if (this.$store.state.tagsSelectedList.length > 0)
        await this.$store.dispatch("getCardsToReviseByTags");
      // .then(() => this.revisionSuccess());
      else await this.$store.dispatch("getCardsToRevise");
      // .then(() => this.revisionSuccess());
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
    // async revisionSuccess() {
    //   if (this.cardsListLength == 0) {
    //     if (this.success) {
    //       if (this.hasRevised) alert("Le deck est vide. Félicitation !");
    //       this.success = false;
    //     } else {
    //       this.success = true;
    //       await this.chargeDeck();
    //     }
    //   } else {
    //     if (this.cardsListLength > 2) this.hasRevised = true;
    //     this.success = false;
    //   }
    // },
  },
  async mounted() {
    await this.chargeDeck();
  },
  watch: {
    async cardsListLength() {
      if (this.cardsListLength > 0) {
        setTimeout(() => {
          let cards = document.querySelectorAll(".sub_card");
          if (cards.length > 0) {
            for (let index of this.cardsList.keys()) {
              cards[index].style.cssText = `
              z-index: ${50 - index};
              transition: all 0.2s 0.${index}s;
              transform:
              translateX(${-index * 3}px)
              translateY(${-index}px)
              rotateZ(${-index * 0.35}deg);
              opacity: 1;
              position: absolute`;
              if (index == 10 || index == cards.length - 1) break;
            }
          }
        });
        // await this.revisionSuccess();
      }
    },
  },

  // mixins: [cardInclination],
};
</script>

<style lang="scss" scoped>
.container {
  min-width: 100%;
}
.deck {
  width: 100%;
  margin: auto;

  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
  & .card {
    margin: auto;
    // min-width: 350px;
    // min-height: 500px;
    width: 90%;
    height: 75vh;
    max-width: 350px;
    max-height: 600px;
  }
}
.sub_card {
  opacity: 0;
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
