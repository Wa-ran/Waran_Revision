<template>
  <form class="m-auto">
    <div class="mt-2">
      <label for="DeckTitle" class="form-label aria-only"> Titre </label>
      <input
        type="text"
        v-model="deck.title"
        class="form-control border-primary text-center fw-bold"
        placeholder="Nouveau titre"
        id="DeckTitle"
        maxlength="20"
      />
    </div>
    <div class="mt-2">
      <label for="DeckText" class="aria-only">Description</label>
      <textarea
        v-model="deck.text"
        class="form-control border-primary text-center"
        placeholder="Description"
        id="DeckText"
        maxlength="126"
      ></textarea>
    </div>
    <div class="d-flex flex-wrap">
      <div class="d-flex mt-2">
        <div>Aléatoire</div>
        <div class="form-check form-switch ms-2">
          <input
            @click="CheckSequence = !CheckSequence"
            v-model="deck.sequence"
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="CheckSequence"
            aria-describedby="CheckSequenceDesc"
          />
          <label class="form-check-label aria-only" for="CheckSequence"
            >Choisir entre aléatoire et séquencé</label
          >
        </div>
        <div>Ordonné</div>
        <cust-tooltip
          id="CheckSequenceDesc"
          :text="'<span class=\'bold\'>Aléatoire</span> <span class=\'italic\'>(défaut)</span> : les cartes seront révisées de manière aléatoire.</br><span class=\'bold\'>Ordonné</span> : les cartes seront révisées dans l\'ordre et auront le même niveau (utile pour apprendre un plan ou des suites d\'idées).'"
        />
      </div>
      <div class="d-flex flex-row justify-content-end ms-auto my-2 me-2 w-100">
        <button
          @click="$router.push({ name: 'Library' })"
          type="button"
          class="btn btn-outline-primary h-fit py-1 mx-2"
        >
          Annuler
        </button>
        <button
          @click="submitForm"
          type="button"
          class="btn btn-primary h-fit py-1"
        >
          Valider
        </button>
      </div>

      <!-- Bouton supprimer -->
      <div v-if="actualDeck" class="w-100">
        <DoubleCheckButton @checkedClick="deleteDeck" class="btn ms-auto py-1">
          <template v-slot:default>
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            <span class="ms-2 flex-grow-1">Supprimer le deck</span>
          </template>
          <template v-slot:checked>
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            <span class="ms-2 flex-grow-1"
              >Supprimer ? &nbsp; Toutes les cartes seront perdues !</span
            >
          </template>
        </DoubleCheckButton>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "ModifDeck",
  data() {
    return {
      deck: {
        submitted: false,
        title: null,
        text: null,
        sequence: false,
        user_id: this.$store.state.user.id,
      },
      origDeck: {},
    };
  },
  props: {
    exit: Boolean,
  },
  computed: {
    actualDeck() {
      return this.$store.state.actualDeck;
    },
  },
  methods: {
    submitForm() {
      if (!this.deck.title) document.getElementById("DeckTitle").focus();
      else this.submitDeck();
    },
    async deleteDeck() {
      await this.$store.dispatch("deleteDeck").then(() => {
        this.$router.push({ name: "Library" });
      });
    },
    async submitDeck() {
      this.submitted = true;
      if (this.actualDeck && this.actualDeck.id) {
        await this.$store.dispatch("putDeck", this.deck).then(() => {
          this.$router.push({ name: "DeckView" });
        });
      } else {
        await this.$store.dispatch("postDeck", this.deck).then(() => {
          this.$router.push({ name: "Library" });
        });
      }
    },
    beforeExit() {
      if (!this.submitted)
        this.mutateKey("formCompare", {
          source: this.origDeck,
          modified: this.deck,
        });
    },
  },
  mounted() {
    const int = setInterval(() => {
      if (this.actualDeck && this.actualDeck.id) {
        this.deck = { ...this.actualDeck };
        this.origDeck = this.deck;
        clearInterval(int);
      }
    }, 200);
    int;
    setTimeout(() => {
      clearInterval(int);
    }, 500);
  },
  watch: {
    exit() {
      if (this.exit) this.beforeExit();
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 400px;
}
</style>
