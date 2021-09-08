<template>
  <main id="home">
    <header>
      <select name="user" id="User" @change="this.changeUser">
        <option value="1">test</option>
        <option value="2">Waran</option>
      </select>
      <label for="User">{{ actualUser }}</label>
    </header>
    <div id="deck" :key="cardsList.length">
      <Card
        v-for="card in cardsList.slice(0, 10)"
        :key="card.id"
        :cardToRevise="card"
      />
      <Card />
    </div>
    <div class="manageDeck">
      <button id="submitCard" @click="this.createCard">Nouvelle carte</button>
      <button v-if="cardsList.length > 0" id="nextCard" @click="this.shiftCard">
        Carte suivante
      </button>
      <button id="charegDeck" @click="this.chargeDeck">
        Recharger le deck
      </button>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
  computed: {
    cardsList() {
      return this.$store.state.cardsList;
    },
    actualUser() {
      return this.$store.state.user.id;
    },
  },
  methods: {
    async chargeDeck() {
      await this.shiftCard(); // permet de reload le deck (key change)
      await this.$store.dispatch("getCardsToRevise");
    },
    async createCard() {
      await this.$store.dispatch("createCard");
    },
    async shiftCard() {
      await this.$store.dispatch("shiftCard");
    },
    changeUser(e) {
      this.$store.dispatch("changeUser", e.target.value);
    },
  },
  async created() {
    await this.chargeDeck();
  },
  watch: {
    async actualUser() {
      await this.chargeDeck();
    },
  },
};
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
#deck {
  width: 100%;
  min-height: 500px;
  margin: 2rem 0;

  display: flex;
  justify-content: center;
  align-content: center;
}
.card {
  min-width: 300px;
  min-height: 500px;
  margin: auto;

  position: absolute;

  &:last-child {
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.5);
  }
}
button {
  margin: auto;
  margin-top: 2rem;
}
.manageDeck {
  margin: auto;
  display: flex;
  & button {
    margin: 1rem;
  }
}
</style>
