<template>
  <div class="container">
    <div v-if="cardSelected" id="modifier" class="modifier deck">
      <button @click="cardSelected = false" class="icon white">
        <font-awesome-icon :icon="['fas', 'times']" size="2x" />
      </button>
      <Card
        @endModif="
          cardSelected = false;
          $store.dispatch('putCard');
          mutateStore('filterList', {
            sKey: 'userCardsList',
            findId: $store.actualCard.id,
          });
          mutateKey('userCardsList', $store.actualCard);
        "
      />
      <Editor />
      <Tags />
    </div>

    <div :key="cardSelected" class="container">
      <div
        v-for="card of userCardsList"
        :key="card.id"
        :id="card.id"
        @click="cardSelection(card)"
        class="card card--mini"
      >
        <!-- <div class="doodle">
        <css-doodle :seed="doodleSeed">
          @grid: 32; @size: 1px calc(35px + 70%); transform: rotate(@r(±90deg));
          background: #e7576a; opacity: calc(1 - 1 / 900 * @index);
        </css-doodle>
      </div> -->

        <div class="verso">
          <div class="content main--content flex-grow-1">
            <div class="readingZone">
              <vue-mathjax v-if="card.recto_formula" :formula="card.recto" />
              <span v-else v-html="card.recto"></span>
            </div>

            <hr v-if="card.recto_comment" />

            <div v-if="card.recto_comment" class="readingZone comment">
              <p v-html="card.recto_comment"></p>
            </div>
          </div>

          <hr />

          <div class="content main--content flex-grow-1">
            <div class="readingZone">
              <vue-mathjax v-if="card.verso_formula" :formula="card.verso" />
              <span v-else v-html="card.verso"></span>
            </div>

            <hr v-if="card.verso_comment" />

            <div v-if="card.verso_comment" class="readingZone comment">
              <p v-html="card.verso_comment"></p>
            </div>
          </div>

          <!-- <div
          v-if="cardTagsListLength > 0 && cardTagsList[0].id"
          class="tags--displayer"
          :key="cardId"
        >
          <button
            v-if="displayScrollTag"
            @mousedown="scrollTag('right')"
            @mouseup="scrollTagStop = true"
            :class="scrollTagPos == 'right' ? 'disabled icon' : 'icon'"
          >
            <font-awesome-icon :icon="['fas', 'chevron-left']" size="lg" />
          </button>

          <div class="tags--container">
            <div
              class="tags--list flex-grow-1"
              :key="$store.state.cardTagsListKey"
            >
              <Tag
                v-for="tag of cardTagsList"
                :key="tag.id"
                :tagId="tag.id"
                :tagName="tag.name"
                class="disabled"
              />
            </div>
          </div>

          <button
            v-if="displayScrollTag"
            @mousedown="scrollTag('left')"
            @mouseup="scrollTagStop = true"
            :class="scrollTagPos == 'left' ? 'disabled icon' : 'icon'"
          >
            <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" />
          </button>
        </div>
        <hr v-else /> -->

          <!-- <div class="content bottom">
          <div class="level">Niveau: {{ card.streak }}</div>
          <div class="calc-revision">
            Prochaine révision {{ nextRevision() }}
          </div>
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Card from "@/components/Card.vue";

import Editor from "@/views/Revision/Editor.vue";
import Tags from "@/views/Revision/Tags.vue";

export default {
  name: "CardsPage",
  components: {
    Card,
    Editor,
    Tags,
  },
  data() {
    return {
      cardSelected: false,
    };
  },
  computed: {
    modifCard() {
      return this.$store.state.modifCard;
    },
    userCardsList() {
      return this.$store.state.userCardsList;
    },
  },
  methods: {
    cardSelection(card) {
      this.cardSelected = false;
      setTimeout(() => {
        this.cardSelected = card;
        if (card) {
          this.cardSelectedId = card.id;
          this.mutateKey("cardReveal", true);
          this.mutateKey("modifCard", true);
          this.mutateKey("cardModifier", true);
          this.mutateKey("actualCard", card);
        } else {
          this.mutateKey("cardModifier", false);
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("getAllUserCards");
  },
  deactivated() {
    this.mutateKey("cardModifier", false);
    this.mutateKey("modifCard", false);
  },
  watch: {
    cardSelected() {
      setTimeout(() => {
        if (this.cardSelected) location.hash = "#modifier";
        else location.hash = "#" + this.cardSelectedId;
      });
    },
    modifCard() {
      if (!this.modifCard) this.cardSelected = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.modifier {
  border: solid 1px $highlight;
  border-right: none;
  border-left: none;
  min-width: 95vw;
  width: auto;
  background-color: $dark_bgc;
  box-shadow: inset 0 0 80px 50px $bgc;
  margin: 2rem;
  padding: 1rem;
  position: relative;
  & > button {
    position: absolute;
    top: -1rem;
    right: 0.5rem;
  }
}
.deck {
  & .card {
    margin: auto;
  }
}
.card--mini {
  min-width: 270px;
  max-width: 270px;
  min-height: 400px;
  max-height: 400px;
  margin: 1rem;
  &:hover,
  &:focus {
    border: solid 1px $white;
    outline: solid 1px $white;
  }
}
</style>