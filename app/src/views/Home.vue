<template>
  <main id="home">
    <Header />

    <div v-if="userId" :key="userId" class="home--main flex-grow-1">
      <div class="tagsZone">
        <Tags />
      </div>

      <div class="central flex-grow-1">
        <Deck />
      </div>

      <div class="edit">
        <Editor id="cardEditor" v-if="isModifying" />
      </div>
    </div>
  </main>
</template>

<script>
import Deck from "@/views/Revision/Deck.vue";
import Editor from "@/views/Revision/Editor.vue";
import Tags from "@/views/Revision/Tags.vue";

import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Deck,
    Editor,
    Header,
    Tags,
  },
  computed: {
    actualCardId() {
      return this.$store.state.actualCard.id;
    },
    cardsList() {
      return this.$store.state.cardsList;
    },
    isModifying() {
      return this.$store.state.modifCard;
    },
    userId() {
      return this.$store.state.user.id;
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
  & .home--main {
    display: flex;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
    & > * {
      min-width: 380px;
      max-width: 25vw;
      height: fit-content;
      padding: 1rem;
      & > * {
        margin: auto;
        margin-top: 2rem;
      }
    }
    & .central {
      display: flex;
      flex-direction: column;
      min-height: 80vh;
      max-width: 100%;
      & > * {
        margin: 0;
      }
    }
  }
}

.tagsZone {
  display: flex;
  flex-wrap: wrap-reverse;
}

@media screen and (max-width: 767px) {
  .home--main {
    & > * {
      width: 100%;
      min-width: 33%;
      max-width: 95vw;
      margin: auto !important;
      & > * {
        width: auto;
        margin: auto;
        margin-top: 0 !important;
      }
    }
    & .central {
      order: 2;
    }
    & .edit {
      order: 1;
    }
    & .tagsZone {
      order: 3;
    }
  }
}
</style>
