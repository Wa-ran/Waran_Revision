<template>
  <div class="allCards w-100 mt-3">
    <button
      @click="$router.push({ name: 'NewCard' })"
      class="btn btn-outline-primary h-fit w-fit mx-auto px-3 py-0 mt-2"
    >
      Nouvelle carte
    </button>

    <div
      v-if="$store.getters.actualDeck.sequence"
      class="d-flex flex-row justify-content-evenly flex-wrap w-100"
    >
      <div
        v-for="(card, index) of $store.state.allCardsList"
        :key="card.id"
        class="position-relative w-fit h-fit m-3 shadow"
      >
        <div
          class="above position-absolute end-0 bg-body border border-primary rounded mt-n1 me-n1 px-2 py-1"
        >
          {{ index + 1 }}
        </div>
        <Card
          :id="card.id"
          @click.capture="handleClick($event, card)"
          role="button"
        >
          <template #body>
            <div class="d-flex flex-column p-2 h-100 text-center">
              <div class="flex-grow-1 w-100 h-25 overflow-scroll">
                <div
                  v-if="!card.recto_image"
                  v-html="card.recto"
                  class="view"
                ></div>
                <CardImage v-else :card="card" :face="'recto'" />
              </div>
              <cust-hr class="w-75 mx-auto my-2" />
              <div class="flex-grow-1 w-100 h-25 overflow-scroll">
                <div
                  v-if="!card.verso_image"
                  v-html="card.verso"
                  class="view"
                ></div>
                <CardImage v-else :card="card" :face="'verso'" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div
      v-else-if="selectedList && selectedList.length > 0"
      class="row justify-content-center"
      :key="allCardsShowCheck"
    >
      <masonry-wall
        :items="allCardsShowCheck ? allCardsList : selectedList"
        :column-width="250"
        :gap="20"
      >
        <template #default="{ item }">
          <div
            :id="item.id"
            @click.capture="handleClick($event, item)"
            role="button"
            class="card bg-body border border-primary shadow h-fit p-2 text-center m-auto"
          >
            <div class="w-100 overflow-scroll">
              <div v-html="item.recto"></div>
            </div>
            <cust-hr class="w-75 mx-auto my-2" />
            <div class="w-100 overflow-scroll">
              <div v-html="item.verso"></div>
            </div>
          </div>
        </template>
      </masonry-wall>
    </div>

    <div v-else class="text-center">
      <div v-if="isLoading">
        <Loader
          :size="'4x'"
          :style="
            isLoading
              ? 'opacity: 1; transform: scale(1)'
              : 'opacity: 0; transform: scale(0)'
          "
        />
      </div>
      <div v-else>Aucune carte à afficher.</div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "AllCards",
  components: {
    Card,
  },
  data() {
    return {
      allCardsList: null,
      selectedList: null,
      isLoading: true,
      test: [],
    };
  },
  computed: {
    allCardsShowCheck() {
      return this.$store.state.app.allCardsShowCheck;
    },
    allCardsDeckCheck() {
      return this.$store.state.app.allCardsDeckCheck;
    },
    allCardsDropCheck() {
      return this.$store.state.app.allCardsDropCheck;
    },
    list() {
      return this.$store.state.allCardsList;
    },
  },
  methods: {
    handleClick(event, card) {
      if (this.allCardsDeckCheck || this.allCardsDropCheck) {
        let deck = "bg-success";
        let drop = "bg-danger";
        let choice = this.allCardsDeckCheck ? deck : drop;
        let other = this.allCardsDeckCheck ? drop : deck;
        let elem = event.srcElement;
        while (![...elem.classList].includes("card") || elem == document) {
          elem = elem.parentNode;
        }
        elem.classList.remove(other);
        this.mutateStore("removeListItem", {
          list: "cardsReservedList",
          item: card,
        });
        this.test = this.test.filter((item) => item.id !== card.id);
        if (elem.classList.contains(choice)) elem.classList.remove(choice);
        else {
          elem.classList.add(choice);
          this.test.push(card);
          this.mutateKey("cardsReservedList", this.test);
        }
      } else {
        this.mutateKey("actualCard", card);
        this.$router.push({ name: "CardView", params: { card: card.id } });
      }
    },
    dropSelected() {
      this.test = [];
      this.mutateKey("cardsReservedList", []);
      let cards = document.querySelectorAll(".allCards .card");
      for (let card of cards) {
        card.classList.remove("bg-success");
        card.classList.remove("bg-danger");
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("getAllDeckCards").then(() => {
      if (this.$store.getters.actualDeck.sequence) {
        setTimeout(() => {
          let views = document.querySelectorAll(".card .view");
          for (let view of views) {
            if (view.scrollHeight < view.parentNode.scrollHeight + 30) {
              view.style.marginTop =
                (view.parentNode.scrollHeight - view.scrollHeight) / 2 + "px";
            }
          }
        });
      } else {
        const int = setInterval(() => {
          if (this.list.length > 0) {
            this.allCardsList = [...this.list];
            this.selectedList = this.allCardsList.filter(
              (card) => new Date() - new Date(card.next_revision) > 0
            );
            clearInterval(int);
            this.isLoading = false;
          }
        }, 100);
        int;
        setTimeout(() => {
          if (this.isLoading == true) {
            clearInterval(int);
            this.isLoading = false;
          }
        }, 1000);
      }
      return;
    });
  },
  unmounted() {
    this.mutateApp("allCardsDeckCheck", false);
    this.mutateApp("allCardsDropCheck", false);
    this.mutateKey("cardsReservedList", []);
  },
  watch: {
    allCardsDeckCheck() {
      this.dropSelected();
    },
    allCardsDropCheck() {
      this.dropSelected();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.card {
  width: 250px;
  height: 250px;
  &.bg-success {
    background-color: $success !important;
    &:not(:bg-body) {
      color: $white !important;
    }
  }
  &.bg-danger {
    background-color: $danger !important;
    &:not(:bg-body) {
      color: $white !important;
    }
  }
}
.row {
  min-width: 85vw;
  max-width: 85vw;
  margin: auto;
  overflow: scroll;
  & .card {
    width: auto;
    height: fit-content !important;
    border-width: 3px !important;
  }
}
</style>
