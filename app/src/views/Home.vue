<template>
  <main id="home">
    <Header />

    <div v-if="userId" :key="userId" class="home--main flex-grow-1">
      <div class="tagsZone">
        <Tags />
      </div>

      <div class="central">
        <Deck @modifying="useCardEditor = $event" />
      </div>

      <div class="edit">
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
    userId() {
      return this.$store.state.user.id;
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
  & .home--main {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    & > * {
      min-width: 350px;
      margin: 1rem;
      & > * {
        margin: auto;
        margin-top: 2rem;
      }
    }
    & * {
      max-width: 96vw;
    }
  }
}

.tagsZone {
  display: flex;
  flex-wrap: wrap-reverse;
}

.central {
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 767px) {
  .home--main {
    & > * {
      width: 100%;
      min-width: 33%;
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
