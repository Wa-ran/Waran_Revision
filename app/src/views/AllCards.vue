<template>
  <div class="allCards w-100 mt-3">
    <button
      @click="$router.push({ name: 'NewCard' })"
      class="btn btn-outline-primary h-fit w-fit mx-auto px-3 py-0 mb-3"
    >
      Nouvelle carte
    </button>

    <div
      v-if="$store.state.actualDeck.sequence"
      class="d-flex flex-row justify-content-evenly flex-wrap w-100"
    >
      <div
        v-for="(card, index) of list"
        :key="index + listChange"
        class="position-relative w-fit h-fit m-3 shadow"
      >
        <div
          v-if="$store.state.app.sequenceListCheck"
          class="above position-absolute end-0 mt-n1 me-n1"
        >
          <select
            @change="changeSequence($event)"
            @focus="cardKey = index"
            onmousedown="if (this.options.length > 8) this.size = 8"
            class="form-select bg-dark text-primary"
            aria-label="Default select example"
          >
            <option
              v-for="(seqCard, seqIndex) of list"
              :key="seqIndex + 1"
              :value="seqIndex + 1"
              :selected="seqIndex + 1 == index + 1"
            >
              {{ seqIndex + 1 }}
            </option>
          </select>
        </div>

        <div
          v-else
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
                  class="view pt-3"
                ></div>
                <CardImage v-else :card="card" :face="'recto'" />
              </div>
              <cust-hr class="w-75 mx-auto my-2" />
              <div class="flex-grow-1 w-100 h-25 overflow-scroll">
                <div
                  v-if="!card.verso_image"
                  v-html="card.verso"
                  class="view pt-3"
                ></div>
                <CardImage v-else :card="card" :face="'verso'" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div
      v-else-if="
        (selectedList && selectedList.length > 0) ||
        (allCardsShowCheck && allCardsList.length > 0)
      "
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
              <div v-if="!item.recto_image" v-html="item.recto"></div>
              <CardImage v-else :card="item" :face="'recto'" />
            </div>
            <cust-hr class="w-75 mx-auto my-2" />
            <div class="w-100 overflow-scroll">
              <div v-if="!item.verso_image" v-html="item.verso"></div>
              <CardImage v-else :card="item" :face="'verso'" />
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
      <div v-else>
        <div class="m-3 mt-5 fw-bold">Aucune carte à afficher.</div>
        <button
          @click="mutateApp('allCardsShowCheck', true)"
          class="btn btn-outline-primary py-0"
        >
          Afficher les cartes à réviser
        </button>
      </div>
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
      cardKey: null,
      listChange: 0,
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
      let list;
      let seqList;
      try {
        seqList = JSON.parse(this.$store.state.actualDeck.sequence_list);
      } catch (error) {
        seqList = this.$store.state.actualDeck.sequence_list;
      }
      let cardList = [...this.$store.state.allCardsList];
      if (!seqList || !seqList.length || !Array.isArray(seqList))
        list = cardList;
      else {
        list = seqList.map((id) => {
          return (id = { ...cardList.find((card) => card.id == id) });
        });
      }
      return list;
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
    changeSequence(event) {
      event.target.size = 1;
      let value = event.target.value - 1;
      let list = [...this.list];
      let card = list.splice(this.cardKey, 1)[0];
      list.splice(value, 0, card);
      list = list.map((card) => (card = card.id));
      this.mutateKey("actualDeck", { sequence_list: JSON.stringify(list) });
      this.cardKey = null;
    },
  },
  async mounted() {
    await this.$store.dispatch("getAllDeckCards").then(() => {
      if (this.$store.state.actualDeck.sequence) {
        if (!Array.isArray(this.$store.state.actualDeck.sequence_list)) {
          let list = [];
          for (let card of this.list) {
            list.push(card.id);
          }
          this.mutateKey("actualDeck", { sequence_list: list });
        }
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
    this.mutateApp("sequenceListCheck", false);
    this.mutateKey("cardsReservedList", []);
  },
  watch: {
    allCardsDeckCheck() {
      this.dropSelected();
    },
    allCardsDropCheck() {
      this.dropSelected();
    },
    list() {
      this.listChange++;
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
