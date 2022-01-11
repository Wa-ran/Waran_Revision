<template>
  <form :key="card.id" class="m-auto h-fit">
    <div class="mt-2 mb-3 h-fit">
      <label for="CardRecto" class="fs-5 ms-n3">
        {{ card.reverse ? "Recto" : "Question" }} :
      </label>
      <TextEditor
        id="CardRecto"
        :contentId="'CardRecto'"
        :text="card.recto"
        @validModif="mutateKey('actualCard', { recto: $event })"
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

    <div class="mt-2 mb-3 h-fit">
      <label for="CardVerso" class="fs-5 ms-n3">
        {{ card.reverse ? "Verso" : "Réponse" }} :
      </label>
      <TextEditor
        id="CardVerso"
        :contentId="'CardVerso'"
        :text="card.verso"
        @validModif="mutateKey('actualCard', { verso: $event })"
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

      <div class="mt-2 mb-3 h-fit">
        <label for="CardVerso" class="fs-5 ms-n3"> Commentaire : </label>
        <TextEditor
          id="CardComment"
          :contentId="'CardComment'"
          :text="card.comment"
          @validModif="mutateKey('actualCard', { comment: $event })"
        />
      </div>

      <cust-hr class="w-50 ms-n3 mb-2" />

      <div class="fs-5 ms-n3">Options :</div>

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
      level
    </div>

    <div class="d-flex justify-content-between mt-3">
      <button
        @click.prevent="options = !options"
        class="btn btn-outline-primary mt-auto ms-n3 py-0 h-fit"
      >
        {{ options ? "Masquer les options" : "Afficher plus d'options" }}
      </button>
      <button class="btn btn-primary py-1 fs-5">Valider</button>
    </div>
  </form>
</template>

<script>
import TextEditor from "@/components/TextEditor";

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
    submitForm() {
      if (!this.deck.title) document.getElementById("CardVerso").focus();
      else this.submitDeck();
    },
    async submitDeck() {
      await this.$store.dispatch("putDeck", this.deck).then(() => {
        this.$emit("submited");
      });
    },
  },
  mounted() {
    this.card = this.$store.state.actualCard;
    this.mutateApp("cardModifInProgress", true);
  },
};
</script>
