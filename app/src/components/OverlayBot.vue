<template>
  <div class="overlay">
    <div class="position-absolute bottom-0 end-0 d-flex w-fit p-2">
      <!-- AllCards Transfert -->
      <div
        v-if="$store.state.app.allCardsDeckCheck"
        class="w-fit bg-dark border border-2 border-primary rounded mx-auto p-2 pt-0"
      >
        <SelectDeck @change="selectDeck = $event.target.value" class="me-n1" />
        <div class="d-flex mt-2">
          <button @click="transfert" class="flex-grow-1 btn btn-success">
            Valider
          </button>
          <button
            @click="
              mutateApp('allCardsDeckCheck', false);
              annulation();
            "
            class="btn btn-primary ms-2"
          >
            Annuler
          </button>
        </div>
      </div>

      <!-- AllCards Deletion -->
      <div
        v-if="$store.state.app.allCardsDropCheck"
        class="d-flex w-fit bg-dark border border-2 border-primary rounded mx-auto p-2"
      >
        <button @click="drop" class="btn btn-danger">Supprimer</button>
        <button
          @click="
            mutateApp('allCardsDropCheck', false);
            annulation();
          "
          class="btn btn-primary ms-2"
        >
          Annuler
        </button>
      </div>

      <!-- scroll to top button  -->
      <div v-if="!toTop" class="w-fit h-fit ms-2 mt-auto">
        <button
          @click="goTop"
          class="has-icon bg-dark btn btn-outline-primary border-2 px-2"
        >
          <font-awesome-icon :icon="['fas', 'arrow-up']" size="2x" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectDeck from "@/components/forms/components/SelectDeck";
import card from "@/mixins/card";

export default {
  name: "Overlay",
  components: {
    SelectDeck,
  },
  data() {
    return {
      selectDeck: null,
      elemScroll: null,
      toTop: true,
    };
  },
  methods: {
    annulation() {
      for (let card of document.querySelectorAll(".allCards .card")) {
        card.classList.remove("bg-success");
        card.classList.remove("bg-danger");
      }
      this.mutateKey("cardsReservedList", []);
    },
    async transfert() {
      if (
        this.selectDeck &&
        this.selectDeck !== this.$store.getters.actualDeck.id
      ) {
        for (let card of this.$store.state.cardsReservedList) {
          if (this.$store.state.app.allCardsDeckCheck) {
            card.deck_id = this.selectDeck;
            await this.mixHandleSubmit(card);
            this.$router.push({ name: "DeckView" });
            setTimeout(() => {
              this.$router.push({ name: "AllCards" });
            });
          }
        }
      }
    },
    async drop() {
      for (let card of this.$store.state.cardsReservedList) {
        if (this.$store.state.app.allCardsDropCheck) {
          card.deck_id = this.selectDeck;
          await this.$store.dispatch("deleteCard", { card });
          this.$router.push({ name: "DeckView" });
          setTimeout(() => {
            this.$router.push({ name: "AllCards" });
          });
        }
      }
    },
    goTop() {
      this.elemScroll.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    document.addEventListener(
      "scroll",
      (e) => {
        this.elemScroll = e.target;
        if (window.innerHeight < e.target.scrollTop * 2) this.toTop = false;
        else this.toTop = true;
      },
      { capture: true }
    );
  },
  mixins: [card],
};
</script>

<style lang="scss" scoped>
.btn.has-icon:hover,
.btn.has-icon:focus {
  color: currentColor !important;
}
</style>
