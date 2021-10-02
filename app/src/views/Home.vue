<template>
  <main id="home">
    <Header @userChange="chargeDeck" />

    <div :key="this.$store.state.user.id" class="home--main flex-grow-1">
      <div id="tagsZone">
        <Tags class="flex-grow-1" />
      </div>

      <div class="central flex-grow-2">
        <Deck @modifying="useCardEditor = $event" />
      </div>

      <div class="edit flex-grow-1">
        <Editor id="cardEditor" v-if="useCardEditor" />
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
    justify-content: space-between;
    flex-wrap: wrap;
    & > div {
      max-width: 400px;
      margin: 1rem;
    }
  }
}

#tagsZone {
  display: flex;
  flex-wrap: wrap-reverse;
  & > * {
    // min-width: 200px;
    max-width: 300px;
  }
}

.central {
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 767px) {
  .home--main {
    & > * {
      width: 100%;
      margin: auto !important;
      & > * {
        width: 95%;
        margin: auto;
      }
    }
    & .central {
      order: 2;
    }
    & .edit {
      order: 1;
    }
    & #tagsZone {
      order: 3;
    }
  }
}
</style>
