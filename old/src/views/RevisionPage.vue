<template>
  <div class="revision--container">
    <div class="tagsZone">
      <Tags />
      <UserOptions />
    </div>

    <div class="central">
      <Deck @success="congratulate" :key="deckKey" />
    </div>

    <div class="edit">
      <Editor id="cardEditor" v-if="modifCardState" />
    </div>
  </div>
</template>

<script>
import Deck from "@/views/Revision/Deck.vue";
import Editor from "@/views/Revision/Editor.vue";
import Tags from "@/views/Revision/Tags.vue";
import UserOptions from "@/components/UserOptions.vue";

export default {
  name: "RevisionPage",
  components: {
    Deck,
    Editor,
    Tags,
    UserOptions,
  },
  data() {
    return {
      deckKey: 0,
    };
  },
  computed: {
    modifCardState() {
      return this.$store.state.modifCard;
    },
  },
  activated() {
    ++this.deckKey;
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.revision--container {
  height: fit-content;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 30%;
    max-width: 30%;
    height: fit-content;
    margin: 1rem;
  }
}
.central {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  max-width: 100%;
  & > * {
    margin: 0;
  }
}

.tagsZone {
  display: flex;
  flex-wrap: wrap;
  > .container {
    min-width: 100%;
  }
}

@media screen and (max-width: 767px) {
  .revision--container {
    width: 100%;
    min-width: 33%;
    max-width: 95vw;
    margin: auto !important;
    padding: 0;
    & > * {
      width: 100%;
      margin: auto;
      max-width: 95vw;
    }
  }
  & .central {
    order: 1;
  }
  & .edit {
    order: 2;
  }
  & .tagsZone {
    order: 3;
  }
}
</style>
