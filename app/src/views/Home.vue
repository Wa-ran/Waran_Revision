<template>
  <main id="home">
    <header>Header</header>
    <div id="prez" :key="cardsList.length">
      <Card v-for="card in cardsList" :key="card.id" :cardToRevise="card" />
      <Card />
    </div>
    <button
      v-if="cardsList.length > 0"
      id="submitCard"
      @click="this.submitCard"
    >
      MAJ la carte
    </button>
    <button v-if="cardsList.length > 0" id="nextCard" @click="this.shiftCard">
      Carte suivante
    </button>
    <button id="submitCard" @click="this.createCard">Nouvelle carte</button>
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
  },
  methods: {
    async createCard() {
      await this.$store.dispatch("createCard");
    },
    async shiftCard() {
      await this.$store.dispatch("shiftCard");
    },
    async submitCard() {
      await this.$store.dispatch("submitCard");
    },
  },
  async created() {
    await this.$store.dispatch("getCardsToRevise");
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
#prez {
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
</style>
