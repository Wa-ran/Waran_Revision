<template>
  <div class="card">
    <div class="doodle">
      <css-doodle :seed="doodleSeed">
        @grid: 32; @size: 1px calc(35px + 70%); transform: rotate(@r(±90deg));
        background: #e7576a; opacity: calc(1 - 1 / 900 * @index);
      </css-doodle>
    </div>

    <div v-if="recto" class="recto">
      <button
        v-if="!isModifying"
        @click="recto = false"
        class="icon flip-card white"
      >
        <font-awesome-icon :icon="['fas', 'share']" size="2x" />
      </button>

      <div class="plain content flex-grow-1">
        <div>
          <div class="readingZone">
            <vue-mathjax
              v-if="actualCard.recto_formula"
              :formula="actualCard.recto"
            />
            <span v-else v-html="actualCard.recto"></span>
          </div>
          <CardChrono v-if="cardChronoState && !noChrono && cardRevealState" />
        </div>
      </div>
    </div>

    <div v-else class="verso">
      <button
        v-if="actualCardId && !isModifying"
        @click="recto = true"
        class="icon flip-card white"
      >
        <font-awesome-icon :icon="['fas', 'share']" size="2x" />
      </button>

      <div
        v-if="isModifying && modifFocus == 'recto'"
        class="editorZone content"
      >
        <TextEditor
          v-if="modifFocus == 'recto'"
          :face="textEditorFace"
          :key="textEditorKey"
          @tabClick="changeFace('verso')"
        />
      </div>
      <div
        v-else
        @click="changeFace('recto')"
        class="content main--content flex-grow-1"
      >
        <div class="readingZone">
          <vue-mathjax
            v-if="actualCard.recto_formula"
            :formula="actualCard.recto"
          />
          <span v-else v-html="actualCard.recto"></span>
        </div>

        <hr v-if="actualCard.recto_comment" />

        <div v-if="actualCard.recto_comment" class="readingZone comment">
          <p v-html="actualCard.recto_comment"></p>
        </div>
      </div>

      <hr />

      <div
        v-if="isModifying && modifFocus == 'verso'"
        class="editorZone content"
      >
        <TextEditor
          v-if="modifFocus == 'verso'"
          :face="textEditorFace"
          :key="textEditorKey"
        />
      </div>
      <div
        v-else
        @click="changeFace('verso')"
        class="content main--content flex-grow-1"
      >
        <div class="readingZone">
          <vue-mathjax
            v-if="actualCard.verso_formula"
            :formula="actualCard.verso"
          />
          <span v-else v-html="actualCard.verso"></span>
        </div>

        <hr v-if="actualCard.verso_comment" />

        <div v-if="actualCard.verso_comment" class="readingZone comment">
          <!-- <div class="comm--title">Commentaire :</div> -->
          <p v-html="actualCard.verso_comment"></p>
        </div>
      </div>

      <div
        v-if="cardTagsListLength > 0 && cardTagsList[0].id"
        class="tags--displayer"
        :key="actualCardId"
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
      <hr v-else />

      <div class="content bottom">
        <div class="streakButtons">
          <button
            v-if="isModifying || !streakSet"
            @click="this.handleStreak(-1)"
          >
            {{ isModifying ? "-1 niveau" : "Perdu" }}
          </button>
          <button
            v-if="!isModifying && !streakSet"
            @click="this.handleStreak()"
          >
            Presque
          </button>
          <button
            v-if="isModifying || !streakSet"
            @click="this.handleStreak(1)"
          >
            {{ isModifying ? "+1 niveau" : "Gagné" }}
          </button>
        </div>

        <div class="level">Niveau: {{ actualCard.streak }}</div>
        <div class="calc-revision">Prochaine révision {{ nextRevision() }}</div>

        <div v-if="!isModifying && wasModified" class="multiButtons">
          <button @click="modifCard(true)"><span>Modifer</span></button>
          <button @click="postCard" class="highlight">
            <span>Valider</span>
          </button>
        </div>
        <div v-else class="multiButtons">
          <button @click="modifCard(true)"><span>Modifer</span></button>
        </div>
        <div v-if="isModifying" class="multiButtons">
          <button
            @click="
              mutateKey('validModifCard', true);
              modifCard(false);
              mutateKey('validModifCard', false);
            "
            class="highlight"
          >
            <span>Terminer</span>
          </button>
          <button @click="reBuild" class="undoAll">
            <font-awesome-icon :icon="['fas', 'history']" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import cardInclination from "../mixins/cardInclination.vue";
import CardChrono from "@/components/CardChrono.vue";
import Tag from "@/components/Tag.vue";
import TextEditor from "@/components/TextEditor.vue";

export default {
  name: "Card",
  components: {
    CardChrono,
    Tag,
    TextEditor,
  },
  data() {
    return {
      cardLoad: false,
      displayScrollTag: false,
      doodleSeed: "",
      modifFocus: "recto",
      noChrono: false,
      originalCard: "",
      recto: true,
      scrollTagPos: "right",
      scrollTagStop: false,
      streakSet: false,
      textEditorFace: "recto",
      textEditorKey: 0,
      wasModified: false,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    actualCardId() {
      return this.$store.getters.actualCardId;
    },
    cardsList() {
      return this.$store.state.cardsList;
    },
    cardRevealState() {
      return this.$store.state.cardReveal;
    },
    cardTagsList() {
      return this.$store.state.cardTagsList;
    },
    cardTagsListLength() {
      return this.$store.state.cardTagsList.length;
    },
    isModifying() {
      return this.$store.state.modifCard;
    },
    cardsToReviseListLength() {
      return this.$store.state.cardsToReviseList.length;
    },
    cardChronoState() {
      return this.$store.state.cardChrono;
    },
    modifComment() {
      return this.$store.state.modifComment;
    },
  },
  methods: {
    async buildActualCard() {
      let bodyActualCard;
      if (this.cardsList.length > 0 && !this.$store.state.newCardCreation) {
        if (!this.$store.state.reviseByOrder && this.$store.state.pickRandom)
          bodyActualCard = this.pickRandom({ ...this.cardsList });
        else {
          bodyActualCard = { ...this.cardsList[0] };
        }
      } else {
        bodyActualCard = { ...this.$store.state.newCard };
        this.mutateKey("newCardCreation", false);
        this.mutateKey("cardReveal", true);
      }

      this.originalCard = bodyActualCard;

      this.mutateKey("actualCard", bodyActualCard);
    },
    reBuild() {
      this.mutateKey("actualCard", this.originalCard);
    },
    calculNextRevision() {
      const HOURS_SUITE = {
        0: 0,
        1: 6,
        2: 6,
        3: 12,
        4: 12,
        5: 21,
        6: 21,
        7: 36,
        8: 36,
        9: 60,
        10: 60,
        11: 96,
        12: 96,
        13: 156,
        14: 156,
        15: 252,
        16: 252,
        17: 408,
        18: 408,
        19: 660,
        20: 660,
        21: 1068,
        22: 1068,
        23: 1728,
        24: 1728,
        25: 2796,
        26: 2796,
        27: 4524,
        28: 4524,
        29: 7320,
        30: 7320,
      };
      let streak = this.actualCard.streak;
      if (streak > HOURS_SUITE.length) streak = HOURS_SUITE.length;
      let number = HOURS_SUITE[streak];
      return new Date(
        new Date().setTime(new Date().getTime() + number * 60 * 60 * 1000)
      );
    },
    handleStreak(add) {
      this.streakSet = true;
      if (add) this.mutateCardModifs("streak", this.actualCard.streak + add);
      else this.mutateCardModifs("streak", this.originalCard.streak);
      if (this.actualCard.streak < 0) this.mutateCardModifs("streak", 0);
      this.nextRevision();
    },
    changeFace(face) {
      this.modifFocus = face;
      this.textEditorFace = face;
      this.mutateKey("modifComment", false);
      ++this.textEditorKey;
    },
    modifCard(bool) {
      if (bool) {
        this.wasModified = true;
      }
      this.mutateKey("modifCard", bool);
    },
    mutateCardModifs(cardKey, value) {
      let cardModif = { ...this.$store.state.actualCard };
      cardModif[cardKey] = value;
      this.mutateKey("actualCard", cardModif);
    },
    nextRevision() {
      let next = this.calculNextRevision();
      let showDate = new Date(next - Date.now());
      if (this.actualCard.streak == 0 || !this.wasModified) {
        return ": maintenant :P";
      } else if (showDate.getTime() / 3600000 < 48)
        return "dans " + Math.round(showDate / 3600000) + " heures.";
      else if (
        showDate.getTime() / 3600000 > 48 &&
        showDate.getTime() / (3600000 * 24) < 14
      )
        return "dans " + Math.round(showDate / (3600000 * 24)) + " jours.";
      else return "le " + next.getDate() + "/" + (1 + next.getMonth());
    },
    async postCard() {
      let streak = this.actualCard.streak;
      let findId = this.actualCardId;
      if (this.actualCard.recto && this.actualCard.verso) {
        if (!this.actualCardId) {
          await this.$store.dispatch("postCard").then(() => {
            if (streak === 0) this.$store.dispatch("getLastCard");
          });
        } else if (streak === 0) {
          this.inverseCard();
          this.$emit("buildNew");
        } else {
          await this.$store.dispatch("putCard").then(() => {
            this.mutateStore("filterList", { sKey: "cardsList", findId });
          });
        }
      }
    },
    inverseCard() {
      let invertedCard = { ...this.actualCard };
      let recto = invertedCard.recto;
      let recto_comment = invertedCard.recto_comment;
      invertedCard.recto = invertedCard.verso;
      invertedCard.verso = recto;
      invertedCard.recto_comment = invertedCard.verso_comment;
      invertedCard.verso_comment = recto_comment;
      this.mutateStore("filterList", {
        sKey: "cardsList",
        findId: this.actualCardId,
      });
      this.mutateStore("mutateKey", {
        sKey: "cardsList",
        body: invertedCard,
      });
    },
    pickRandom() {
      let list = this.cardsList;
      return list[Math.floor(Math.random() * list.length)];
    },
    scrollTag(direction = false) {
      this.scrollTagStop = false;
      let card = document.querySelector(".verso");
      let cont = document.querySelector(".tags--container");
      let list = document.querySelector(".tags--list");

      if (!direction) {
        if (card.scrollWidth < list.scrollWidth) this.displayScrollTag = true;
      } else {
        const scroll = setInterval(() => {
          if (direction == "left") {
            cont.scrollLeft += 2;
          } else {
            cont.scrollLeft -= 2;
          }
          if (cont.scrollLeft + cont.offsetWidth > list.offsetWidth + 10)
            this.scrollTagPos = "left";
          else if (cont.scrollLeft == 0) this.scrollTagPos = "right";
          else this.scrollTagPos = "middle";
          if (this.scrollTagStop) clearInterval(scroll);
          else this.scrollTagStop = false;
        }, 10);
        scroll;
      }
    },
  },
  async mounted() {
    if (!this.doodleSeed) this.doodleSeed = Math.trunc(Math.random) * 1000;
    await this.buildActualCard()
      .then(() => {
        if (
          !this.actualCardId &&
          this.$store.state.tagsSelectedList.length == 0
        ) {
          this.mutateKey("cardReveal", true);
          this.recto = false;
          this.modifCard(true);
        } else this.modifCard(false);
        if (this.actualCardId) {
          this.mutateKey("cardReveal", !this.cardChronoState);
        }
      })
      .then(() => {
        if (this.actualCardId) this.$store.dispatch("getCardTags");
        else this.mutateKey("cardTagsList", []);
      })
      .then(() => {
        this.$emit("mounted");
      });
  },
  unmounted() {
    this.$emit("modifying", false);
  },
  watch: {
    streakSet() {
      this.wasModified = true;
    },
    recto() {
      setTimeout(() => {
        if (!this.recto && this.cardTagsListLength > 0) this.scrollTag();
      });
    },
    cardTagsListLength() {
      if (!this.recto && this.cardTagsListLength > 0) this.scrollTag();
    },
    cardChronoState() {
      if (!this.cardChronoState)
        this.mutateKey("cardReveal", !this.cardChronoState);
      else this.noChrono = true;
    },
    modifComment() {
      if (this.modifComment) {
        this.textEditorFace += "_comment";
      } else {
        this.textEditorFace = this.textEditorFace.replace(/_comment/, "");
      }
      ++this.textEditorKey;
    },
  },
  // mixins: [cardInclination],
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.tags--displayer {
  overflow-x: scroll;
  overflow-y: visible;
  max-width: 100%;
  min-height: 30px;
  margin: 0.5rem 0;
  padding: 2px 0;
  display: flex;
  & > button {
    padding: 0 0.1rem;
    border: none;
    outline: none;
    background-color: transparent;
    & svg {
      color: $highlight;
      margin: 0;
    }
    &:not(.disabled):hover svg,
    &:not(.disabled):focus svg {
      color: $white;
    }
  }
}
.tags--container {
  width: calc(100% - 2rem);
  height: fit-content;
  flex-grow: 1;
  padding: 2px 0;
  overflow-x: scroll;
  overflow-y: visible;
  display: flex;
}
.tags--list {
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  min-width: fit-content;
  height: fit-content;
  overflow: visible;
  margin: -1px 0.25rem;
  & .tag {
    margin-right: 0.5rem;
  }
}

.content.bottom {
  max-width: 100%;
  min-height: 70px;
  max-height: 70px;
  padding: 0;
  padding-bottom: 0.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & .calc-revision {
    font-style: italic;
  }
  & .streak {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  & .level {
    width: 100%;
    font-size: 0.75rem;
    margin: 0.5rem;
  }
  & .streakButtons {
    position: absolute;
    top: -3px;
    left: -2.5%;
    width: 105%;
    display: flex;
    justify-content: space-between;
    & button {
      width: 30%;
      word-wrap: normal;
    }
  }
  & .multiButtons {
    position: absolute;
    bottom: -0.5rem;
    left: -0.25rem;
  }
  & .undoAll > svg {
    margin: 0;
  }
}
</style>
