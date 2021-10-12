<template>
  <div :key="actualCard" class="card">
    <div class="doodle">
      <css-doodle :seed="doodleSeed">
        @grid: 32; @size: 1px calc(35px + 70%); transform: rotate(@r(±90deg));
        background: #e7576a; opacity: calc(1 - 1 / 1000 * @index);
      </css-doodle>
    </div>

    <div v-if="recto" class="recto">
      <button
        v-if="!actualCard.end"
        @click="recto = false"
        class="fa-icon flip-card"
      >
        <font-awesome-icon :icon="['fas', 'share']" size="2x" />
      </button>
      <div class="main--content flex-grow-1">
        <div class="readingZone">
          <vue-mathjax
            v-if="actualCard.recto_formula"
            :formula="actualCard.recto"
          />
          <span v-else v-html="actualCard.recto"></span>
        </div>
      </div>
    </div>

    <div v-else class="verso">
      <button
        v-if="actualCardId"
        @click="recto = true"
        class="fa-icon flip-card"
      >
        <font-awesome-icon :icon="['fas', 'share']" size="2x" />
      </button>

      <div class="main--content flex-grow-1">
        <div class="readingZone">
          <vue-mathjax
            v-if="actualCard.recto_formula"
            :formula="actualCard.recto"
          />
          <span v-else v-html="actualCard.recto"></span>
        </div>

        <hr v-if="actualCard.recto_comment" />

        <div v-if="actualCard.recto_comment" class="readingZone comm--title">
          <div>Commentaire :</div>
          <p v-html="actualCard.recto_comment"></p>
        </div>
      </div>

      <hr />

      <div class="main--content flex-grow-2">
        <div class="readingZone">
          <vue-mathjax
            v-if="actualCard.verso_formula"
            :formula="actualCard.recto"
          />
          <span v-else v-html="actualCard.verso"></span>
        </div>

        <hr v-if="actualCard.verso_comment" />

        <div v-if="actualCard.verso_comment" class="readingZone comm--title">
          <div>Commentaire :</div>
          <p v-html="actualCard.verso_comment"></p>
        </div>

        <div class="streakButtons">
          <button
            v-if="isModifying || !streakSet"
            @click="this.handleStreak(-1)"
          >
            Perdu
          </button>
          <button v-if="isModifying || !streakSet" @click="this.handleStreak()">
            à Réviser
          </button>
          <button
            v-if="isModifying || !streakSet"
            @click="this.handleStreak(1)"
          >
            Gagné
          </button>
        </div>
      </div>

      <hr />

      <div class="bottom">
        <div class="level">Niveau: {{ actualCard.streak }}</div>
        <div class="calc-revision">Prochaine révision {{ nextRevision() }}</div>
        <div v-if="!isModifying && wasModified" class="multiButtons">
          <button @click="modifState(true)"><span>Modifer</span></button>
          <button @click="postCard" class="default">
            <span>Valider</span>
          </button>
        </div>
        <div v-if="isModifying" class="multiButtons">
          <button @click="saveCardChanges" class="default">
            <span>Terminer</span>
          </button>
          <button @click="buildActualCard" class="icon">
            <font-awesome-icon :icon="['fas', 'undo']" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import cardInclination from "../mixins/cardInclination.vue";

export default {
  name: "Card",
  data() {
    return {
      doodleSeed: "",
      recto: true,
      initialStreak: "",
      streakSet: false,
      wasModified: false,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    actualCardId() {
      return this.$store.state.actualCard.id;
    },
    cardsList() {
      return this.$store.state.cardsList;
    },
    isModifying() {
      return this.$store.state.modifCard;
    },
  },
  methods: {
    buildActualCard() {
      let bodyActualCard;
      if (this.cardsList.length > 0) bodyActualCard = { ...this.cardsList[0] };
      else bodyActualCard = { ...this.$store.state.newCard };

      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "actualCard",
          body: bodyActualCard,
        },
      });
      this.initialStreak = bodyActualCard.streak;
      if (!this.actualCardId) {
        this.recto = false;
        this.modifState(true);
      } else this.modifState(false);
    },
    calculNextRevision() {
      const HOURS_SUITE = {
        0: 0,
        1: 6,
        2: 12,
        3: 22,
        4: 36,
        5: 60,
        6: 96,
        7: 156,
        8: 252,
        9: 408,
        10: 660,
        11: 1068,
        12: 1728,
        13: 2796,
        14: 4524,
        15: 7320,
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
      if (add) this.mutateModifs("streak", this.actualCard.streak + add);
      else this.mutateModifs("streak", this.initialStreak);
      if (this.actualCard.streak < 0) this.mutateModifs("streak", 0);
      this.nextRevision();
    },
    modifState(bool) {
      if (bool) this.wasModified = true;
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "modifCard",
          body: bool,
        },
      });
    },
    mutateModifs(cardKey, value) {
      let cardModif = { ...this.$store.state.actualCard };
      cardModif[cardKey] = value;
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "actualCard",
          body: cardModif,
        },
      });
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
      if (this.actualCardId) {
        await this.$store.dispatch("putCard");
        this.$store.dispatch("mutateStore", {
          fct: "shiftKey",
          value: "cardsList",
        });
      } else await this.$store.dispatch("postCard");
      if (this.cardsList.length == 0) this.buildActualCard();
    },
    async saveCardChanges() {
      // Modifier la carte sans échanger recto et verso
      let cardReverse = this.actualCard.reverse;
      this.mutateModifs("reverse", false);
      this.modifState(false);
      await this.$store
        .dispatch("putCard")
        .then(() => this.mutateModifs("reverse", cardReverse));
    },
  },
  async beforeMount() {
    await this.buildActualCard();
    this.doodleSeed = Math.trunc(Math.random) * 1000;
  },
  unmounted() {
    this.$emit("modifying", false);
  },
  watch: {
    streakSet() {
      this.wasModified = true;
    },
  },
  // mixins: [cardInclination],
};
</script>

<style lang="scss" scoped>
.multiButtons {
  position: absolute;
  bottom: -0.5rem;
  left: -0.25rem;
}

.bottom {
  width: auto;
  max-width: 100%;
  min-height: 40px;
  padding: 0.5rem 0;
  & .calc-revision {
    font-style: italic;
  }
  & .streak {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  & .mini {
    margin: 0.25rem;
    margin-bottom: -0.25rem;
    font-size: 0.75rem;
    text-align: right;
  }
  & .level {
    margin: 0;
    margin-top: -0.5rem;
    margin-left: 0.5rem;
    width: fit-content;
    font-size: 0.75rem;
  }
}
</style>
