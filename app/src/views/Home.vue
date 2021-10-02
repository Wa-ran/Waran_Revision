<template>
  <main id="home">
    <Header @userChange="chargeDeck" />

    <div :key="this.$store.state.user.id" class="home--main flex-grow-1">
      <div id="tagsZone">
        <Tags class="flex-grow-1" />
      </div>

      <div class="central flex-grow-1">
        <Deck @modifying="useCardEditor = $event" />
      </div>

      <div>
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

#cardEditor {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
