<template>
  <main id="home">
    <Header @userChange="chargeDeck" />

    <div :key="this.$store.state.user.id" class="home--main flex-grow-1">
      <div id="tagsZone">
        <TagsList class="flex-grow-1" />
      </div>

      <div class="central flex-grow-1">
        <div id="deck" class="flex-grow-1" :key="cardsList.length">
          <Card @modifying="useCardEditor = $event" />
          <div
            v-for="card in cardsList.slice(0, 5)"
            :key="card"
            class="card move"
          ></div>
        </div>

        <div class="deckManager">
          <button @click="createCard"><span>Nouvelle carte</span></button>
          <button v-if="cardsList.length > 0" @click="shiftCard">
            <span>Passer la carte</span>
          </button>
          <button @click="chargeDeck">
            <span>Recharger le deck</span>
          </button>
          <button @click="deleteCard" class="importantButton">
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            <span class="flex-grow-1">Supprimer la carte</span>
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
import TagsList from "@/components/TagsList.vue";

export default {
  name: "Home",
  components: {
    Card,
    Editor,
    Header,
    TagsList,
  },
  data() {
    return {
      useCardEditor: false,
    };
  },
  computed: {
    actualCardId() {
      return this.$store.state.actualCard.id;
    },
    cardsList() {
      return this.$store.state.cardsList;
    },
  },
  methods: {
    async chargeDeck() {
      if (this.$store.state.searchTagsList.length > 0)
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
    actualCardId() {
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

#tagsZone {
  display: flex;
  flex-wrap: wrap-reverse;
  & > * {
    min-width: 200px;
    max-width: 200px;
    margin: 1rem;
  }
}

.central {
  display: flex;
  flex-direction: column;
}

#deck {
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
  & button {
    min-width: 30%;
    margin: 0.5rem auto;
  }
}

#cardEditor {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
