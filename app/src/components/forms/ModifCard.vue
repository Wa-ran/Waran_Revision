<template>
  <form class="m-auto h-fit">
    <div class="mt-2 h-fit">
      <label for="CardRecto">
        {{ card.reverse ? "Recto :" : "Réponse" }}
      </label>
      <TextEditor
        v-if="card.recto"
        id="CardRecto"
        :contentId="'CardRecto'"
        :text="card.recto"
        @validModif="mutateKey('actualCard', { recto: $event })"
      />
    </div>
    {{ $store.state.actualCard }}

    <div class="mt-2 h-fit">
      <label for="CardVerso">
        {{ card.reverse ? "Verso :" : "Réponse" }}
      </label>
      <TextEditor
        v-if="card.verso"
        id="CardVerso"
        :contentId="'CardVerso'"
        :text="card.verso"
        @validModif="mutateKey('actualCard', { verso: $event })"
      />
    </div>

    <div class="form-check">
      <input
        v-model="speed"
        class="form-check-input"
        type="checkbox"
        id="speedCheck"
        tabindex="1"
        @click="mutateApp('speedCheck', !speedCheck)"
      />
      <label class="form-check-label" for="speedCheck"> Mode rapide </label>
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
