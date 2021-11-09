<template>
  <div class="container">
    <div class="indication">
      <span v-if="isModifying">Aperçu :</span>

      <div v-else>
        <div>
          Encore
          <span class="bold">{{ cardsToReviseList.length }}</span>
          carte{{ cardsToReviseList.length > 1 ? "s" : "" }} à réviser.
        </div>
        <div v-if="tagsSelectedListLength > 0">
          <span class="bold italic">{{ cardsList.length }}</span> avec les tags
          sélectionnés.
        </div>
      </div>
    </div>

    <div class="deck flex-grow-1">
      <CardHider v-if="!cardRevealState" />
      <Card v-if="cardKey > 0" @buildNew="shiftCard" :key="cardKey" />

      <div
        v-for="(card, index) in deckDisplay"
        :key="index"
        :class="
          index == deckDisplay - 1 ? 'card sub_card shadow' : 'card sub_card'
        "
      ></div>
    </div>

    <div v-if="!isModifying" class="deckManager">
      <div v-if="actualCardId">
        <button @click="createCard">
          <span>Nouvelle carte</span>
        </button>
      </div>
      <div v-if="cardsList.length > 1 && cardRevealState">
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
          <template v-slot:default>
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            <span class="flex-grow-1">Supprimer la carte</span>
          </template>
          <template v-slot:checked>
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            <span class="flex-grow-1">Supprimer ?</span>
          </template>
        </DoubleCheckButton>
      </div>
    </div>

    <div v-else class="deckManager modif">
      <div>
        <button @click="actualCardId ? modifCard(false) : shiftCard()">
          <span>Annuler</span>
        </button>
      </div>
      <!-- <div>
        <button @click="chargeDeck">
          <span>Recharger le deck</span>
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
// import cardInclination from "@/mixins/cardInclination.vue";
import Card from "@/components/Card.vue";
import CardHider from "@/components/CardHider.vue";

export default {
  name: "Deck",
  components: {
    Card,
    CardHider,
  },
  data() {
    return {
      atLeastOne: false,
      cardKey: 0,
      cardDebounce: null,
      hasSucceed: false,
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
      return this.$store.state.cardsList.length;
    },
    cardRevealState() {
      return this.$store.state.cardReveal;
    },
    cardsToReviseList() {
      return this.$store.state.cardsToReviseList;
    },
    cardsToReviseListLength() {
      return this.$store.state.cardsToReviseList.length;
    },
    deckDisplay() {
      return this.$store.state.tagsSelectedList.length > 0
        ? this.cardsList.length > 7
          ? 7
          : this.cardsList.length
        : this.cardsToReviseList.length > 7
        ? 7
        : this.cardsToReviseList.length;
    },
    isModifying() {
      return this.$store.state.modifCard;
    },
    storeLoading() {
      return this.$store.state.loading;
    },
    reviseByOrder() {
      return this.$store.state.reviseByOrder;
    },
    tagsSelectedListLength() {
      return this.$store.state.tagsSelectedList.length;
    },
  },
  methods: {
    chargeCard() {
      if (this.cardDebounce) clearTimeout(this.cardDebounce);
      this.cardDebounce = setTimeout(() => {
        if (this.storeLoading) this.chargeCard();
        else ++this.cardKey;
      }, 200);
    },
    async chargeDeck() {
      if (this.tagsSelectedListLength > 0 && this.cardsList.length > 0)
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
      this.mutateKey("newCardCreation", true);
      this.chargeCard();
    },
    async deleteCard() {
      await this.$store.dispatch("deleteCard").then(() => {
        this.$store.dispatch("mutateStore", {
          fct: "filterList",
          value: { sKey: "cardsList", findId: this.actualCardId },
        });
      });
    },
    shiftCard() {
      this.modifCard(false);
      if (this.cardRevealState && !this.reviseByOrder) {
        // ____
        if (this.cardsList.length > 1) this.shiftLoop = true;
        else this.shiftLoop = false;
        this.shiftedCard = this.actualCardId;
        this.chargeCard();
        setTimeout(() => {
          if (this.shiftLoop) this.shiftCard();
        }, 200);
      }
    },
    modifCard(bool) {
      this.mutateKey("modifCard", bool);
    },
    paintDeck() {
      setTimeout(() => {
        let cards = document.querySelectorAll(".sub_card");
        for (let index of cards.keys()) {
          cards[index].style.cssText = `
            z-index: ${49 - index};
            transition: all 0.2s 0.${index}s;
            transform:
            translateX(${-index * 3}px)
            translateY(${-index}px)
            rotateZ(${-index * 0.35}deg);
            opacity: ${1 - index / 12};`;
          if (index == 8 || index == cards.length - 1) break;
        }
      });
    },
    async revisionSuccess() {
      if (this.successDebounce) clearTimeout(this.successDebounce);
      this.successDebounce = setTimeout(() => {
        if (this.cardsList.length === 0 && !this.stopCharge) {
          if (this.hasSucceed && this.tagsSelectedListLength == 0)
            this.$emit("success");
          this.stopCharge = true;
          if (this.cardsToReviseList.length > 0) this.chargeDeck();
          else this.createCard();
        } else if (this.cardsList.length > 1) {
          this.stopCharge = false;
          this.chargeCard();
        } else this.chargeCard();
      });
    },
  },
  async mounted() {
    await this.chargeDeck()
      .then(() => {
        this.mutateKey("deckCharged", true);
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
      if (this.cardsList.length == 0) this.revisionSuccess();
    },
    cardsToReviseListLength() {
      this.paintDeck();
      if (this.cardsToReviseList.length > 0) this.atLeastOne = true;
      if (this.cardsToReviseList.length == 0 && this.atLeastOne)
        this.hasSucceed = true;
      this.revisionSuccess();
    },
    reviseByOrder() {
      this.chargeCard();
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
  & .card:first-child {
    z-index: 101;
    position: relative;
  }
  & .card {
    position: absolute;
    margin: auto;
    // min-width: 350px;
    // min-height: 65vh;
  }
  & .shadow {
    box-shadow: -1px -1px 25px 2px rgba(0, 0, 0, 0.75);
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
