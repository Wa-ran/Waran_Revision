<template>
  <div class="w-100 mt-3">
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
        <Card :id="card.id" @click="goToCard(card)" role="button">
          <template #body>
            <div class="d-flex flex-column p-2 h-100 text-center">
              <div class="flex-grow-1 w-100 h-25 overflow-scroll">
                <div v-html="card.recto" class="view"></div>
              </div>
              <cust-hr class="w-75 mx-auto my-2" />
              <div class="flex-grow-1 w-100 h-25 overflow-scroll">
                <div v-html="card.verso" class="view"></div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div v-else class="row justify-content-center">
      <masonry-wall
        :items="$store.state.allCardsList"
        :column-width="250"
        :rtl="true"
        :gap="20"
      >
        <template #default="{ item }">
          <div
            :id="item.id"
            @click="goToCard(item)"
            role="button"
            class="card bg-body border border-primary shadow h-fit p-2 text-center m-auto"
            :class="
              allCardsShowCheck || new Date() - new Date(item.next_revision) > 0
                ? ''
                : 'hideIt'
            "
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
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "AllCards",
  components: {
    Card,
  },
  computed: {
    allCardsShowCheck() {
      return this.$store.state.app.allCardsShowCheck;
    },
  },
  methods: {
    goToCard(card) {
      this.mutateKey("actualCard", card);
      this.$router.push({ name: "CardView", params: { card: card.id } });
    },
  },
  mounted() {
    this.$store.dispatch("getAllUserCards");
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
    } else if (!this.allCardsShowCheck) {
      const int = setInterval(() => {
        let masonsHidden = document.querySelectorAll(".hideIt");
        for (let hide of masonsHidden) {
          hide.parentNode.nextSibling.style.marginTop = "-20px";
        }
        if (masonsHidden) clearInterval(int);
      }, 100);
      int;
      setTimeout(() => {
        clearInterval(int);
      }, 1000);
    }
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 250px;
  height: 250px;
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
.hideIt {
  margin: 0 !important;
  height: 0 !important;
  border: none !important;
  padding: 0 !important;
  & * {
    display: none;
  }
}
</style>
