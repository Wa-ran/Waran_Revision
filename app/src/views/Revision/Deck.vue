<template>
  <div class="container">
    <div class="indication">
      <div class="loading">
        <Loader :size="'2x'" />
      </div>

      <span v-if="isModifying">Aperçu :</span>
      <div v-else>
        <div>
          Encore
          <span class="bold">{{ cardsToReviseLength }}</span>
          carte{{ cardsToReviseLength > 1 ? "s" : "" }} à réviser.
        </div>
        <div v-if="tagsSelectedListLength > 0">
          <span class="bold italic">{{ cardsListLength }}</span> avec les tags
          sélectionnés.
        </div>
      </div>
    </div>

    <div class="deck flex-grow-1">
      <Card
        @cardReveal="cardReveal = $event"
        @buildNew="shiftCard"
        :key="cardKey"
      />

      <div
        v-for="index in deckDisplay"
        :key="index"
        class="card sub_card"
      ></div>
      <div class="card sub_card shadow"></div>
    </div>

    <div
      v-if="!isModifying"
      @click.capture="loading = true"
      class="deckManager"
    >
      <div v-if="actualCardId">
        <button @click="createCard">
          <span>Nouvelle carte</span>
        </button>
      </div>
      <div v-if="cardsListLength > 1">
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
      atLeastOne: false,
      cardKey: 0,
      cardReveal: false,
      cardDebounce: null,
      hasSucceed: false,
      loading: false,
      shiftLoop: false,
      shiftedCard: null,
      stopCharge: false,
      successDebounce: null,
    };
  },
  computed: {
    actualCardId() {
      return this.$store.getters.actualCardId;
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
    deckDisplay() {
      return this.$store.state.tagsSelectedList.length > 0
        ? this.cardsListLength > 7
          ? 7
          : this.cardsListLength
        : this.cardsToReviseLength > 7
        ? 7
        : this.cardsToReviseLength;
    },
    isModifying() {
      return this.$store.state.modifCard;
    },
    tagsSelectedListLength() {
      return this.$store.state.tagsSelectedList.length;
    },
  },
  methods: {
    chargeCard(newCard = false) {
      if (this.cardDebounce) clearTimeout(this.cardDebounce);
      this.cardDebounce = setTimeout(() => {
        if (!newCard)
          try {
            if (this.$store.state.cardsList[0].new == true)
              this.$store.dispatch("mutateStore", {
                fct: "shiftKey",
                value: "newCard",
              });
          } catch (error) {
            ++this.cardKey;
          }
        ++this.cardKey;
      }, 200);
    },
    async chargeDeck() {
      if (this.tagsSelectedListLength > 0 && this.cardsListLength > 0)
        await this.$store
          .dispatch("getCardsToReviseByTags")
          .then(() => this.revisionSuccess());
      else {
        this.mutateKey("tagsSelectedList", []);
        await this.$store
          .dispatch("getCardsToRevise")
          .then(() => this.revisionSuccess());
      }
    },
    createCard() {
      this.mutateKey("pickRandom", false);
      this.mutateKey("cardsList", this.$store.state.newCard);
      this.chargeCard(true);
    },
    async deleteCard() {
      await this.$store
        .dispatch("deleteCard")
        .then(() => {
          this.$store.dispatch("mutateStore", {
            fct: "shiftKey",
            value: { skey: "cardsList" },
          });
        })
        .then(() => {
          this.mutateKey("cardsToReviseLength", --this.cardsToReviseLength);
        });
    },
    shiftCard() {
      if (this.cardReveal) {
        if (this.cardsListLength > 1) this.shiftLoop = true;
        else this.shiftLoop = false;
        this.shiftedCard = this.actualCardId;
        this.chargeCard();
        setTimeout(() => {
          if (this.shiftLoop) this.shiftCard();
        }, 200);
      } else this.loading = false;
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
          if (index == 8 || index == cards.length - 1) break;
        }
      });
    },
    async revisionSuccess() {
      if (this.successDebounce) clearTimeout(this.successDebounce);
      this.successDebounce = setTimeout(() => {
        if (this.cardsListLength === 0 && !this.stopCharge) {
          if (this.hasSucceed && this.tagsSelectedListLength == 0)
            this.$emit("success");
          this.stopCharge = true;
          if (this.cardsToReviseLength > 0) this.chargeDeck();
          else this.createCard();
        } else if (this.cardsListLength > 1) this.stopCharge = false;
        this.chargeCard();
      });
    },
    loadingState() {
      let cardLoader = document.querySelector(".indication .loading");
      cardLoader.style.cssText = `transition: opacity 0.3s; opacity: 1;`;
      let stop = setInterval(() => {
        if (!this.loading) {
          cardLoader.style.cssText += `opacity: 0;`;
          clearInterval(stop);
        }
      }, 500);
    },
  },
  async mounted() {
    this.loadingState();
    await this.chargeDeck()
      .then(() => {
        this.$emit("charged");
      })
      .then(() => {
        this.paintDeck();
      });
  },
  watch: {
    actualCardId() {
      this.paintDeck();
      if (this.actualCardId != this.shiftedCard) {
        this.shiftedCard = null;
        this.shiftLoop = false;
      }
    },
    cardsListLength() {
      if (this.cardsListLength == 0) this.revisionSuccess();
    },
    cardsToReviseLength() {
      this.paintDeck();
      if (this.cardsToReviseLength > 0) this.atLeastOne = true;
      if (this.cardsToReviseLength == 0 && this.atLeastOne)
        this.hasSucceed = true;
      this.revisionSuccess();
    },
    cardKey() {
      this.loading = false;
    },
    loading() {
      if (this.loading) this.loadingState();
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
  padding-right: 75px;
  width: fit-content;
  display: flex;
  position: relative;
  & span {
    padding: 0.5rem;
  }
}

.loading {
  position: absolute;
  left: -2rem;
  color: $pink;
}

@media screen and (max-width: 767px) {
  .deck {
    margin: auto;
  }
  .deckManager {
    margin-bottom: 0;
  }
  .indication {
    padding-right: 0;
  }
}
</style>
