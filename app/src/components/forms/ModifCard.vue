<template>
  <form :key="card.id" class="m-auto h-fit">
    <!-- Recto -->
    <div class="mt-2 mb-3 h-fit">
      <label for="CardRecto" class="fs-5 ms-n3">
        {{ card.reverse ? "Recto" : "Question" }} :
      </label>
      <TextEditor
        id="CardRecto"
        :contentId="'CardRecto'"
        :text="card.recto"
        @validModif="card.recto = $event"
      />

      <div v-if="options">
        <div class="form-check mt-2">
          <input
            v-model="card.recto_image"
            class="form-check-input"
            type="checkbox"
            id="recto_image"
            @click="card.recto_image = $event"
          />
          <label class="form-check-label italic" for="recto_image">
            Insérer une image
          </label>
        </div>

        <div class="form-check mt-2">
          <input
            v-model="card.recto_formula"
            class="form-check-input"
            type="checkbox"
            id="recto_formula"
            @click="card.recto_formula"
          />
          <label class="form-check-label italic" for="recto_formula">
            Ecrire une formule
          </label>
        </div>
      </div>
    </div>

    <cust-hr v-if="options" class="w-50 ms-n3 mb-2" />

    <!-- Verso -->
    <div class="mt-2 mb-3 h-fit">
      <label for="CardVerso" class="fs-5 ms-n3">
        {{ card.reverse ? "Verso" : "Réponse" }} :
      </label>
      <TextEditor
        id="CardVerso"
        :contentId="'CardVerso'"
        :text="card.verso"
        @validModif="card.verso = $event"
      />

      <div v-if="options">
        <div class="form-check mt-2">
          <input
            v-model="card.verso_image"
            class="form-check-input"
            type="checkbox"
            id="verso_image"
            @click="card.verso_image = $event"
          />
          <label class="form-check-label italic" for="verso_image">
            Insérer une image
          </label>
        </div>

        <div class="form-check mt-2">
          <input
            v-model="card.verso_formula"
            class="form-check-input"
            type="checkbox"
            id="verso_formula"
            @click="card.verso_formula = $event"
          />
          <label class="form-check-label italic" for="verso_formula">
            Ecrire une formule
          </label>
        </div>
      </div>
    </div>

    <div v-if="options">
      <cust-hr class="w-50 ms-n3 mb-2" />

      <!-- Comment -->
      <div class="mt-2 mb-3 h-fit">
        <label for="CardVerso" class="fs-5 ms-n3"> Commentaire : </label>
        <TextEditor
          id="CardComment"
          :contentId="'CardComment'"
          :text="card.comment"
          @validModif="card.comment = $event"
        />
      </div>

      <cust-hr class="w-50 ms-n3 mb-2" />

      <div class="fs-5 ms-n3 mb-3">Options :</div>

      <!-- Reverse -->
      <div class="form-check d-flex mt-2">
        <input
          v-model="card.reverse"
          class="form-check-input"
          type="checkbox"
          id="reverse"
          @click="card.reverse = $event"
          aria-describedby="reverseDesc"
        />
        <label class="form-check-label italic ms-2" for="reverse">
          Inverser la carte
        </label>
        <cust-tooltip
          id="reverseDesc"
          :text="'Par défaut, la carte s\'inverse à chaque révision pour accélérer l\'apprentissage.</br></br>Décochez pour créer une carte \'\'Question/Réponse\'\' !'"
        />
      </div>

      <cust-hr class="w-25 my-3" />

      <!-- Level -->
      <div class="form-check d-flex align-items-center mt-2 ps-0">
        <div class="italic">Niveau :&nbsp;</div>

        <button
          @click.prevent="card.level--"
          aria-label="Diminuer d'un niveau"
          class="has-icon"
        >
          <font-awesome-icon :icon="['far', 'minus-square']" />
        </button>

        <div class="level bold mx-1">{{ mixShowLevel(card) }}</div>

        <button
          @click.prevent="card.level++"
          aria-label="Augmenter d'un niveau"
          class="has-icon"
        >
          <font-awesome-icon :icon="['far', 'plus-square']" />
        </button>
        <cust-tooltip
          class="ms-0 me-0 mt-n3"
          :text="'Si vous venez de réviser la carte, la réussite/défaite est prise en compte.'"
        />

        <span v-if="mixShowRevision(card)" class="italic"
          >&nbsp;&nbsp;(révision {{ mixShowRevision(card) }})</span
        >
      </div>
    </div>

    <cust-hr class="w-25 my-3" />

    <!-- Deck -->
    <div class="form-check d-flex align-items-center mt-2 p-0">
      <div class="italic me-2">Deck :</div>
      <select
        class="form-select form-select-sm w-fit h-fit bg-body m-0"
        aria-label="Transérer dans un autre deck"
        aria-describedby="selectDeckDesc"
        v-model="card.deck_id"
      >
        <option
          v-for="deck of $store.state.decksList"
          :key="deck.id"
          :value="deck.id"
        >
          {{ deck.title }}
        </option>
      </select>
      <cust-tooltip
        id="selectDeckDesc"
        class="mt-n4"
        :text="'Choisissez à quel deck appartient la carte.'"
      />
    </div>

    <cust-hr class="w-25 my-3" />

    <!-- Boutons -->
    <div class="d-flex justify-content-between flex-wrap mt-3">
      <button
        @click.prevent="options = !options"
        class="btn btn-outline-primary ms-n3 me-5 mb-2 py-0 h-fit w-fit text-nowrap"
      >
        {{ options ? "Masquer les options" : "Afficher plus d'options" }}
      </button>

      <div class="d-flex ms-auto">
        <button
          v-if="modif"
          @click.prevent="submitForm"
          class="btn btn-primary w-fit py-1"
        >
          Valider
        </button>
        <button
          @click.prevent="annulForm"
          class="btn w-fit ms-2 py-1"
          :class="modif ? 'btn-primary' : 'btn-outline-primary'"
        >
          Terminer
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import TextEditor from "@/components/TextEditor";
import card from "@/mixins/card";

export default {
  name: "ModifCard",
  components: {
    TextEditor,
  },
  data() {
    return {
      card: {},
      change: 0,
      options: false,
      modif: false,
    };
  },
  computed: {
    actualCard() {
      if (this.$route.name === "NewCard") return this.$store.state.newCard;
      else return this.$store.state.actualCard;
    },
    cardChange() {
      return JSON.stringify(this.card);
    },
  },
  methods: {
    selectDeck() {
      let select = document.querySelectorAll("select option");
      for (let option of select) {
        if (option.value == this.$store.getters.actualDeck.id)
          return (option.selected = true);
      }
    },
    annulForm() {
      if (this.card.id) this.$router.push({ name: "CardView" });
      else this.$router.push({ name: "DeckView" });
    },
    async submitForm() {
      this.mutateKey("actualCard", this.card);
      await this.$store
        .dispatch("submitCard")
        .then(() => this.$router.push({ name: "CardView" }));
    },
    beforeExit() {
      this.mutateKey("formCompare", {
        source: { ...this.actualCard },
        modified: this.$store.state.cardsToReviseBaseList[this.actualCard.key],
      });
    },
  },
  mounted() {
    this.card = { ...this.actualCard };
    if (!this.card.deck_id)
      this.card.deck_id = this.$store.getters.actualDeck.id; // new card
  },
  watch: {
    cardChange() {
      if (JSON.stringify(this.card) != JSON.stringify(this.actualCard))
        this.modif = true;
      else this.modif = false;
    },
    options() {
      if (this.options) this.selectDeck();
    },
  },
  mixins: [card],
};
</script>

<style lang="scss" scoped>
.has-icon {
  font-size: 1.2rem;
}
.form-select {
  color: currentColor;
}
.level {
  width: 20px;
  text-align: center;
}
</style>
