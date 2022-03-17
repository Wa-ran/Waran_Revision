<template>
  <form :key="card.id" class="m-auto h-fit">
    <!-- Recto -->
    <div class="mt-2 mb-3 h-fit">
      <label for="CardRecto" class="fs-5 ms-n3">
        {{ card.reverse ? "Recto" : "Question" }} :
      </label>
      <ImageInput
        v-if="card.recto_image"
        @fileChange="
          card.recto_image = !!$event ? $event : origCard.recto_image
        "
        :card="card"
        :face="'recto'"
        class="my-2"
      />
      <TextEditor
        v-else
        id="CardRecto"
        :contentId="'CardRecto'"
        :text="card.recto"
        @validModif="card.recto = $event"
      />

      <div v-if="options">
        <div class="form-check mt-2">
          <input
            :checked="!!card.recto_image"
            class="form-check-input"
            type="checkbox"
            id="recto_image"
            @click="
              card.recto_image = card.recto_image
                ? null
                : origCard.recto_image || true
            "
          />
          <label class="form-check-label italic" for="recto_image">
            Insérer une image
          </label>
        </div>

        <!-- <div class="form-check mt-2">
          <input
            v-model="card.recto_formula"
            class="form-check-input"
            type="checkbox"
            id="recto_formula"
            @click="card.recto_formula = !card.recto_formula"
          />
          <label class="form-check-label italic" for="recto_formula">
            Ecrire une formule
          </label>
        </div> -->
      </div>
    </div>

    <cust-hr v-if="options" class="w-50 ms-n3 mb-2" />

    <!-- Verso -->
    <div class="mt-2 mb-3 h-fit">
      <label for="CardVerso" class="fs-5 ms-n3">
        {{ card.reverse ? "Verso" : "Réponse" }} :
      </label>
      <ImageInput
        v-if="card.verso_image"
        @fileChange="
          card.verso_image = !!$event ? $event : origCard.verso_image
        "
        :card="card"
        :face="'verso'"
        class="my-2"
      />
      <TextEditor
        v-else
        id="CardVerso"
        :contentId="'CardVerso'"
        :text="card.verso"
        @validModif="card.verso = $event"
      />

      <div v-if="options">
        <div class="form-check mt-2">
          <input
            :checked="!!card.verso_image"
            class="form-check-input"
            type="checkbox"
            id="verso_image"
            @click="
              card.verso_image = card.verso_image
                ? null
                : origCard.verso_image || true
            "
          />
          <label class="form-check-label italic" for="verso_image">
            Insérer une image
          </label>
        </div>

        <!-- <div class="form-check mt-2">
          <input
            v-model="card.verso_formula"
            class="form-check-input"
            type="checkbox"
            id="verso_formula"
            @click="card.verso_formula = !card.verso_formula"
          />
          <label class="form-check-label italic" for="verso_formula">
            Ecrire une formule
          </label>
        </div> -->
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

      <cust-hr class="w-50 ms-n3 my-3" />

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

        <div class="level bold mx-1">{{ mixShowLevel(card.level) }}</div>

        <button
          @click.prevent="card.level++"
          aria-label="Augmenter d'un niveau"
          class="has-icon"
        >
          <font-awesome-icon :icon="['far', 'plus-square']" />
        </button>

        <span v-if="mixShowRevision(card)" class="italic"
          >&nbsp;&nbsp;(révision {{ mixShowRevision(card) }})</span
        >
      </div>
      <div class="mt-2">
        Si vous venez de réviser, il est conseillé de passer la carte :
        <ul>
          <li>
            au niveau
            <span class="fw-bold">{{
              mixShowLevel(card.adapt_level_down)
            }}</span>
            si vous avez <span class="fst-italic">perdu</span> ;
          </li>
          <li>
            au niveau
            <span class="fw-bold">{{ mixShowLevel(card.adapt_level_up) }}</span>
            si vous avez <span class="fst-italic">gagné</span>.
          </li>
        </ul>
      </div>
    </div>

    <cust-hr class="w-50 ms-n3 my-3" />

    <!-- Deck -->
    <SelectDeck @changeDeck="card.deck_id = $event.target.value" />

    <cust-hr class="w-50 ms-n3 my-3 mb-4" />

    <!-- Boutons -->
    <div class="d-flex justify-content-between flex-wrap mt-3">
      <button
        @click.prevent="options = !options"
        class="btn btn-outline-primary ms-n3 me-5 mb-2 py-0 h-fit w-fit text-nowrap"
      >
        {{ options ? "Masquer les options" : "Afficher plus d'options" }}
      </button>

      <div class="d-flex flex-column ms-auto">
        <div class="d-flex">
          <button
            @click.prevent="submitForm"
            class="btn w-100 py-1"
            :class="modif ? 'btn-primary' : 'btn-outline-primary'"
          >
            Valider
          </button>
          <button
            @click.prevent="annulForm"
            class="btn w-fit ms-2 py-1"
            :class="modif ? 'btn-outline-primary' : 'btn-primary'"
          >
            Terminer
          </button>
        </div>
        <!-- Bouton supprimer -->
        <DoubleCheckButton
          v-if="card.id"
          @checkedClick="deleteCard"
          class="btn ms-auto mt-2"
          :classDefault="'btn-danger'"
        >
          <template v-slot:default>
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            <span class="ms-2 flex-grow-1">Supprimer la carte</span>
          </template>
          <template v-slot:checked>
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            <span class="ms-2 flex-grow-1">Supprimer ?</span>
          </template>
        </DoubleCheckButton>
      </div>
    </div>
  </form>
</template>

<script>
import TextEditor from "@/components/TextEditor";
import SelectDeck from "@/components/forms/components/SelectDeck";
import ImageInput from "@/components/forms/components/ImageInput";
import card from "@/mixins/card";

export default {
  name: "ModifCard",
  components: {
    TextEditor,
    SelectDeck,
    ImageInput,
  },
  props: {
    exit: Boolean,
  },
  data() {
    return {
      card: {},
      change: 0,
      charged: false,
      options: false,
      origCard: null,
      modif: false,
      submitted: false,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    cardChange() {
      return JSON.stringify(this.card);
    },
  },
  methods: {
    selectDeck() {
      let select = document.querySelectorAll("select option");
      for (let option of select) {
        if (option.value == this.$store.state.actualDeck.id)
          return (option.selected = true);
      }
    },
    annulForm() {
      if (this.card.id) this.$router.push({ name: "CardView" });
      else this.$router.push({ name: "DeckView" });
    },
    async submitForm() {
      if (!this.card.recto && !this.card.recto_image) {
        document
          .querySelector("#CardRecto .contentEditable")
          .scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (!this.card.verso && !this.card.verso_image) {
        document
          .querySelector("#CardVerso .contentEditable")
          .scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (
        (this.card.recto || this.card.recto_image) &&
        (this.card.verso || this.card.verso_image)
      ) {
        let newCard = !this.card.id;
        let files = [];
        for (let input of document.querySelectorAll('input[type="file"]')) {
          if (!document.getElementById(this.card.id + input.name)) {
            // check if img is present
            this.files = [];
            return input.focus();
          }
          if (input.files[0]) files.push(input.files[0]);
        }
        this.mutateKey("filesInputs", files);
        if (this.card.recto_image) this.card.recto = "";
        if (this.card.verso_image) this.card.verso = "";
        this.mutateKey("actualCard", this.card);
        this.mutateApp("loading", true);
        this.submitted = true;
        await this.mixHandleSubmit(this.card)
          .then(() => {
            if (newCard) return this.$store.dispatch("getLastUserCard");
            else return this.$store.dispatch("getCard");
          })
          .then(() => {
            this.$store.dispatch("getDeck");
          })
          .then(() =>
            setTimeout(() => {
              this.$router.push({
                name: "CardView",
                params: {
                  card: this.$store.state.actualCard.id,
                  deck: this.$store.state.actualCard.deck_id,
                },
              });
            })
          )
          .then(() => {
            if (newCard) this.mutateApp("positionSaved", { name: "NewCard" });
            this.mutateApp("loading", false);
          })
          .catch(() => (this.submitted = false));
      }
    },
    async deleteCard() {
      this.mutateKey("actualCard", this.card);
      await this.$store
        .dispatch("deleteCard")
        .then(() => {
          this.$store.dispatch("getDeck");
        })
        .then(() => {
          if (
            this.$store.state.app.positionSaved &&
            this.$store.state.app.positionSaved.path
          )
            this.$router.push(this.$store.state.app.positionSaved.path);
          else
            this.$router.push({
              name: "DeckView",
              params: { deck: this.card.deck_id },
            });
        })
        .then(() => this.mutateApp("loading", false));
    },
    beforeExit() {
      if (!this.submitted)
        this.mutateKey("formCompare", {
          source: this.origCard,
          modified: this.card,
        });
    },
  },
  beforeMount() {
    this.card = { ...this.actualCard };
    this.card.win = null;
    if (this.$route.name === "NewCard") {
      this.card = { ...this.$store.state.newCard };
      this.card.user_id = this.$store.state.user.id;
      this.card.deck_id = this.$store.getters.actualDeck.id;
      this.modif = false;
    }
    if (
      this.card.recto_image ||
      this.card.verso_image ||
      this.card.recto_formula ||
      this.card.verso_formula ||
      this.card.comment ||
      !this.card.reverse
    )
      this.options = true;
    this.origCard = { ...this.card };
  },
  mounted() {
    this.mutateKey("filesInputs", []);
    this.charged = true;
  },
  watch: {
    cardChange() {
      if (
        this.charged &&
        !this.submitted &&
        JSON.stringify(this.card) !== JSON.stringify(this.origCard)
      )
        this.modif = true;
      else this.modif = false;
    },
    exit() {
      if (this.exit) this.beforeExit();
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
.img {
  max-height: 250px;
}
</style>
