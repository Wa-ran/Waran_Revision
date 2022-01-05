<template>
  <form>
    <div class="mt-2">
      <label for="DeckTitle" class="form-label aria-only"> Titre </label>
      <input
        type="text"
        v-model="DeckTitle"
        class="form-control border-primary"
        placeholder="Nouveau titre"
        id="DeckTitle"
      />
    </div>
    <div class="mt-2">
      <label for="DeckText" class="aria-only">Description</label>
      <textarea
        v-model="DeckText"
        class="form-control border-primary"
        placeholder="Description"
        id="DeckText"
      ></textarea>
    </div>
    <div class="d-flex mt-2">
      <div>Aléatoire</div>
      <div class="form-check form-switch ms-2">
        <input
          @click="CheckSequence = !CheckSequence"
          v-model="CheckSequence"
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
    <div>
      <button @click="submitForm" type="button" class="btn btn-primary ms-auto">
        Envoyer
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ModifDeck",
  data() {
    return {
      DeckTitle: null,
      DeckText: null,
      CheckSequence: false,
    };
  },
  methods: {
    submitForm() {
      if (!this.DeckTitle) document.getElementById("DeckTitle").focus();
      else if (!this.DeckText) document.getElementById("DeckText").focus();
      else this.submitUser();
    },
    async submitUser() {
      this.mutateKey("ActualDeck", {
        title: this.DeckTitle,
        text: this.DeckText,
        sequence: this.DeckSequence,
      });

      await this.$store.dispatch("putDeck");
    },
  },
};
</script>
