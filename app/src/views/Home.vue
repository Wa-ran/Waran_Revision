<template>
  <main id="home">
    <Header @userChange="this.chargeDeck" />

    <div class="home--main flex-grow-1">
      <div class="tagsZone"></div>

      <div class="revisionZone flex-grow-1">
        <div id="deck" class="flex-grow-1" :key="cardsList.length">
          <Card id="actualCard" @modifying="useCardEditor = $event" />
          <div
            v-for="card in cardsList.slice(0, 5)"
            :key="card"
            class="card"
          ></div>
        </div>

        <div class="deckManager">
          <button id="submitCard" @click="this.createCard">
            Nouvelle carte
          </button>
          <button
            v-if="cardsList.length > 0"
            id="nextCard"
            @click="this.shiftCard"
          >
            Passer
          </button>
          <button id="charegDeck" @click="this.chargeDeck">
            Recharger le deck
          </button>
        </div>
      </div>

      <div>
        <Editor id="cardEditor" v-if="useCardEditor" />
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import Editor from "@/components/Editor.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Card,
    Editor,
    Header,
  },
  data() {
    return {
      useCardEditor: false,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard.id;
    },
    cardsList() {
      return this.$store.state.cardsList;
    },
  },
  methods: {
    async chargeDeck() {
      await this.shiftCard(); // permet de reload le deck (key change)
      await this.$store.dispatch("getCardsToRevise");
    },
    async createCard() {
      await this.$store.dispatch("mutateStore", { fct: "createCard" });
    },
    async shiftCard() {
      await this.$store.dispatch("mutateStore", { fct: "shiftCard" });
    },
  },
  async created() {
    await this.chargeDeck();
  },
  watch: {
    actualCard() {
      this.useCardEditor = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/global";

#home {
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  & > .home--main {
    width: 100%;
    display: flex;
    & > div {
      width: 100%;
    }
  }
}

#deck {
  width: 100%;
  min-height: 500px;
  margin: 1rem 0 2rem 0;

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
  margin: auto;
  display: flex;
  justify-content: space-between;
  & button {
    min-width: 25%;
    margin: 1rem;
  }
}
</style>
