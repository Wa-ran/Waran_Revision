<template>
  <form class="m-auto">
    <div class="mt-2">
      <label for="DeckTitle" class="form-label aria-only"> Titre </label>
      <input
        type="text"
        v-model="deck.title"
        class="form-control border-primary"
        placeholder="Nouveau titre"
        id="DeckTitle"
      />
    </div>
    <div class="mt-2">
      <label for="DeckText" class="aria-only">Description</label>
      <textarea
        v-model="deck.text"
        class="form-control border-primary"
        placeholder="Description"
        id="DeckText"
      ></textarea>
    </div>
    <div class="d-flex">
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
          />
          <label class="form-check-label aria-only" for="CheckSequence"
            >Default switch checkbox input</label
          >
        </div>
        <div>Séquencé</div>
        <cust-tooltip
          :text="'<span class=\'bold\'>Aléatoire</span> <span class=\'italic\'>(défaut)</span> : les cartes seront révisées de manière aléatoire.</br><span class=\'bold\'>Séquencé</span> : les cartes seront révisées dans l\'ordre et auront le même niveau (utile pour apprendre un plan ou des suites d\'idées).'"
        />
      </div>
      <div class="flex-grow-1">
        <button
          @click="submitForm"
          type="button"
          class="btn btn-primary h-fit py-0 m-3 me-0 ms-auto"
        >
          Valider
        </button>
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
        title: null,
        text: null,
        sequence: false,
      },
    };
  },
  methods: {
    submitForm() {
      if (!this.deck.title) document.getElementById("DeckTitle").focus();
      else this.submitDeck();
    },
    async submitDeck() {
      await this.$store.dispatch("putDeck", this.deck).then(() => {
        this.$emit("submited");
      });
    },
  },
  mounted() {
    this.deck = this.$store.getters.actualDeck;
  },
};
</script>
