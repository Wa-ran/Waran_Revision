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
            @click="mutateKey('actualCard', { recto_image: $event })"
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
            @click="mutateKey('actualCard', { recto_formula: $event })"
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
            @click="mutateKey('actualCard', { verso_image: $event })"
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
            @click="mutateKey('actualCard', { verso_formula: $event })"
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
          @click="mutateKey('actualCard', { reverse: $event })"
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
          >&nbsp;&nbsp;(révision ~ {{ mixShowRevision(card) }})</span
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
        :text="'Vous pouvez transférez la carte dans un autre deck.'"
      />
    </div>

    <cust-hr class="w-25 my-3" />

    <!-- Boutons -->
    <div class="d-flex justify-content-between mt-3">
      <button
        @click.prevent="options = !options"
        class="btn btn-outline-primary mb-auto ms-n3 me-5 py-0 h-fit"
      >
        {{ options ? "Masquer les options" : "Afficher plus d'options" }}
      </button>

      <div class="d-flex flex-column">
        <button
          @click.prevent="validForm"
          class="btn btn-primary w-fit py-1 ms-auto"
        >
          Valider
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
      options: false,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    cardModifInProgress() {
      return this.$store.state.app.cardModifInProgress;
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
    validForm() {
      this.mutateKey("actualCard", this.card);
      this.$router.push({ name: "CardView" });
    },
  },
  mounted() {
    this.card = this.$store.state.actualCard;
    this.mutateApp("cardModifInProgress", true);
  },
  watch: {
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
