<template>
  <div :key="actualCard" class="card move">
    <!-- <div class="doodle">
      <css-doodle use="var(--pattern-card-side)"></css-doodle>
    </div> -->

    <div v-if="recto" class="recto">
      <button @click="recto = false" class="fa-icon flip-card">
        <font-awesome-icon :icon="['fas', 'share']" size="2x" />
      </button>
      <div class="readingZone flex-grow-1">
        <span v-html="actualCard.recto"></span>
      </div>
    </div>

    <div v-else class="verso">
      <button @click="recto = true" class="fa-icon flip-card">
        <font-awesome-icon :icon="['fas', 'share']" size="2x" />
      </button>

      <div class="readingZone flex-grow-1">
        <span v-html="actualCard.recto"></span>
      </div>

      <hr />

      <div class="readingZone flex-grow-3">
        <span v-html="actualCard.verso"></span>

        <div class="streakButtons">
          <button
            v-if="modifyingCard || !streakSet"
            @click="this.handleStreak(-1)"
          >
            Perdu
          </button>
          <button
            v-if="modifyingCard || !streakSet"
            @click="this.handleStreak()"
          >
            à Réviser
          </button>
          <button
            v-if="modifyingCard || !streakSet"
            @click="this.handleStreak(1)"
          >
            Gagné
          </button>
        </div>
      </div>

      <hr />

      <div class="bottom">
        <div class="calc-revision">Prochaine révision {{ nextRevision() }}</div>
        <div v-if="!modifyingCard && wasModified" class="multiButtons">
          <button @click="modifyingCard = true"><span>Modifer</span></button>
          <button @click="postCard"><span>Valider</span></button>
        </div>
        <div v-if="modifyingCard" class="multiButtons">
          <button @click="saveCardChanges"><span>Terminer</span></button>
          <button @click="buildActualCard" class="icon">
            <font-awesome-icon :icon="['fas', 'undo']" />
          </button>
        </div>
        <div class="mini">
          niveau: {{ actualCard.streak }} &nbsp; id-{{ zerofillId }}
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
      recto: true,
      modifyingCard: false,
      streakSet: false,
      wasModified: false,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    zerofillId() {
      let id = this.actualCard.id ? this.actualCard.id : 0;
      let width = 5 - id.toString().length;
      if (width > 0) {
        return new Array(width + (/\./.test(id) ? 2 : 1)).join("0") + id;
      }
      return id + "";
    },
  },
  methods: {
    async buildActualCard() {
      let bodyActualCard;
      if (this.$store.state.cardsList.length > 0)
        bodyActualCard = { ...this.$store.state.cardsList[0] };
      else bodyActualCard = { ...this.$store.state.defaultCard };

      await this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate: "actualCard",
          body: bodyActualCard,
        },
      });
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
      if (this.actualCard.streak < 0) this.mutateModifs("streak", 0);
      this.nextRevision();
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
      if (this.actualCard.id) {
        await this.$store.dispatch("putCard");
        this.$store.dispatch("mutateStore", {
          fct: "shiftKey",
          value: "cardsList",
        });
      } else await this.$store.dispatch("postCard");
    },
    async saveCardChanges() {
      // Modifier la carte sans échanger recto et verso
      let cardReverse = this.actualCard.reverse;
      this.mutateModifs("reverse", false);
      this.modifyingCard = false;
      await this.$store
        .dispatch("putCard")
        .then(() => this.mutateModifs("reverse", cardReverse));
    },
  },
  async mounted() {
    await this.buildActualCard();
  },
  watch: {
    modifyingCard() {
      this.wasModified = true;
      this.$emit("modifying", this.modifyingCard);
    },
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
}
</style>
