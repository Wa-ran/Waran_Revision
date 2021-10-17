<template>
  <div class="container">
    <div class="indication">
      <div class="loading">
        <Loader v-show="loading && actualCardId" :size="'2x'" />
      </div>
      <span v-if="isModifying">Aperçu :</span>
      <span v-else
        >Encore
        <span style="font-weight: bold; padding: 0.25rem">{{
          cardsToReviseLength
        }}</span>
        carte{{ cardsToReviseLength > 1 ? "s" : "" }} à réviser.</span
      >
    </div>

    <div class="deck flex-grow-1">
      <Card @mounted="loadingState" :key="cardsListLength" />

      <div
        v-for="card in cardsList.slice(0, 8)"
        :key="card"
        class="card sub_card"
      ></div>
      <div class="card sub_card shadow"></div>
    </div>

    <div v-if="!isModifying" class="deckManager">
      <div v-if="actualCardId">
        <button @click="createCard">
          <span>Nouvelle carte</span>
        </button>
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

    <div v-else class="deckManager modif">
      <div>
        <button @click="actualCardId ? modifCard(false) : shiftCard()">
          <span>Annuler</span>
        </button>
      </div>
      <div>
        <button @click="chargeDeck">
          <span>Recharger le deck</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import cardInclination from "@/mixins/cardInclination.vue";
import Card from "@/components/Card.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "Deck",
  components: {
    Card,
    Loader,
  },
  data() {
    return {
      loading: false,
      hasSucceed: false,
      stop: false,
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
    cardsToReviseLength() {
      return this.$store.state.cardsToReviseLength;
    },
    isModifying() {
      return this.$store.state.modifCard;
    },
  },
  methods: {
    async chargeDeck() {
      if (this.$store.state.tagsSelectedList.length > 0)
        await this.$store.dispatch("getCardsToReviseByTags");
      else
        await this.$store.dispatch("getCardsToRevise").then(() => {
          setTimeout(() => {
            this.mutateKey("cardsToReviseLength", this.cardsListLength);
          }, 600);
        });
      this.loadingState();
    },
    createCard() {
      this.mutateKey("pickRandom", false);
      this.mutateKey("cardsList", this.$store.state.newCard);
    },
    async deleteCard() {
      this.$store.dispatch("mutateStore", {
        fct: "shiftKey",
        value: "cardsList",
      });
      await this.$store.dispatch("deleteCard");
      this.mutateKey("cardsToReviseLength", --this.cardsToReviseLength);
    },
    async shiftCard() {
      this.$store.dispatch("mutateStore", {
        fct: "shiftKey",
        value: "cardsList",
      });
      await this.revisionSuccess();
    },
    modifCard(bool) {
      if (bool) this.wasModified = true;
      this.mutateKey("modifCard", bool);
    },
    paintDeck() {
      setTimeout(() => {
        let cards = document.querySelectorAll(".sub_card");
        for (let index of cards.keys()) {
          cards[index].style.cssText = `
            z-index: ${50 - index};
            transition: all 0.2s 0.${index}s;
            transform:
            translateX(${-index * 3}px)
            translateY(${-index}px)
            rotateZ(${-index * 0.35}deg);
            opacity: 1;`;
          if (index == 10 || index == cards.length - 1) break;
        }
      });
    },
    async revisionSuccess() {
      if (this.cardsListLength === 0 && !this.stop) {
        setTimeout(() => {
          if (this.cardsToReviseLength === 0 && !this.hasSucceed) {
            this.$emit("success");
            this.hasSucceed = true;
            this.stop = true;
          } else {
            this.chargeDeck();
          }
        }, 350);
      } else if (this.cardsListLength > 1) this.stop = false;
    },
    loadingState() {
      if (!this.loading) {
        this.loading = true;
        let cardLoader = document.querySelector(".indication .loading");
        cardLoader.style.cssText = `transition: opacity 1s; opacity: 1;`;
        setTimeout(() => {
          cardLoader.style.cssText += `opacity: 0;`;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }, 500);
      }
    },
  },
  async mounted() {
    await this.chargeDeck()
      .then(() => {
        this.$emit("charged");
      })
      .then(() => {
        this.paintDeck();
      });
    // .then(() => {
    //   this.loadingState();
    // });
  },
  watch: {
    actualCardId() {
      this.paintDeck();
    },
    cardsListLength() {
      this.paintDeck();
      setTimeout(async () => {
        await this.revisionSuccess();
      }, 350);
    },
  },

  // mixins: [cardInclination],
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.container {
  min-width: 100%;
  // max-height: 90vh;
}
.deck {
  width: 100%;
  margin: auto;

  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
  & .card,
  & .loading {
    margin: auto;
    // min-width: 350px;
    // min-height: 65vh;
    width: 90%;
    height: 75vh;
    max-width: 350px;
    max-height: 600px;
  }
  & .shadow {
    box-shadow: -2px -2px 25px 2px rgba(0, 0, 0, 0.55);
  }
}
.sub_card {
  opacity: 0;
  position: absolute;
}

.deckManager {
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &.modif {
    flex-direction: column;
  }
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

.indication {
  margin: 0 auto;
  margin-bottom: 1.5rem;
  padding-right: 100px;
  width: fit-content;
  display: flex;
  & span {
    padding: 0.5rem;
  }
}

.loading {
  // position: absolute;
  & > * {
    // position: absolute;
    bottom: 2rem;
    left: 36%;
    z-index: 101;
    color: $pink;
  }
}

@media screen and (max-width: 767px) {
  .deck {
    margin: auto;
  }
  .deckManager {
    margin-bottom: 0;
  }
}
</style>
