<template>
  <div class="w-fit mt-3 mx-auto">
    <!-- Carte pour cacher la carte de révision -->
    <CardHider
      class="position-absolute"
      style="z-index: 1000"
      :style="
        $store.state.app.cardHideCheck && !$store.state.app.cardReveal
          ? ''
          : 'z-index: -1'
      "
    />
    <!-- Carte de révision -->
    <Card>
      <template v-slot:body>
        <div
          v-if="$store.state.app.cardReviserCharged"
          class="w-100 h-100 bg-body"
        >
          <div class="bg-body position-absolute top-0 end-0 m-2">
            <!-- Bouton pour "retourner" la carte -->
            <button
              @click="
                recto = !recto;
                chrono = false;
                flipped = true;
              "
              class="has-icon btn btn-outline-primary p-1"
            >
              <font-awesome-icon :icon="['fas', 'share']" size="2x" />
            </button>
          </div>

          <!-- Contenu de la carte -->
          <div class="d-flex flex-column overflow-scroll h-100">
            <div
              class="flex-grow-1 d-flex flex-column justify-content-center align-items-center p-3"
            >
              <div
                v-html="recto ? actualCard.recto : actualCard.verso"
                class="text-center w-100"
              ></div>

              <div v-if="displayComment" class="w-100">
                <cust-hr class="w-75 mx-auto" />
                <div v-html="actualCard.comment"></div>
              </div>
            </div>

            <!-- Chronomètre ou commentaire -->
            <div class="w-100 px-2">
              <CardChrono
                v-if="$store.state.app.cardReveal && !flipped"
                :style="
                  $store.state.app.cardChronoCheck && recto && chrono
                    ? ''
                    : 'opacity: 0'
                "
              />

              <button
                v-else-if="actualCard.comment && !displayComment && flipped"
                @click="displayComment = true"
                class="btn btn-primary py-0 mx-auto mb-1"
              >
                Voir mes notes
              </button>

              <button
                v-if="actualCard.comment && displayComment"
                @click="displayComment = false"
                class="btn btn-primary py-0 mx-auto mb-1"
              >
                Cacher mes notes
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- Footer -->
      <template v-slot:footer v-if="!chrono && flipped">
        <!-- Gagné/Perdu -->
        <div
          v-if="!winSetted"
          class="footer d-flex justify-content-between pb-1 pt-2"
        >
          <button
            @click="setWin(false)"
            class="btn btn-danger border-danger h-fit p-0"
          >
            Perdu
          </button>
          <button @click="setWin()" class="btn btn-primary h-fit p-0">
            Presque
          </button>
          <button
            @click="setWin(true)"
            class="btn btn-success border-success h-fit p-0"
          >
            Gagné
          </button>
        </div>

        <!-- Modifier/Valider -->
        <div v-else class="d-flex justify-content-between pb-1 pt-2">
          <button
            @click="
              $router.push({
                name: 'CardView',
                params: { card: actualCard.id },
              })
            "
            class="btn btn-primary h-fit w-fit p-0 px-3"
          >
            Modifer
          </button>
          <button
            @click="submitCard"
            class="btn btn-primary h-fit w-fit p-0 px-3"
          >
            Valider
          </button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card";
import CardChrono from "@/components/CardChrono";
import CardHider from "@/components/CardHider";

export default {
  name: "revision",
  components: {
    Card,
    CardChrono,
    CardHider,
  },
  data() {
    return {
      displayComment: false,
      recto: true,
      chrono: true,
      flipped: false,
      winSetted: false,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    cardChronoCheck() {
      return this.$store.state.app.cardChronoCheck;
    },
    pickCard() {
      return this.$store.getters.pickCard;
    },
  },
  methods: {
    async handleSubmit() {
      if (this.actualCard.level === 0) {
        return this.mutateStore("reserveCard");
      } else {
        await this.$store.dispatch("putCard").then(() => {
          this.$store.dispatch("removeCard");
        });
      }
    },
    setActualCard() {
      this.mutateApp("cardReviserCharged", false);
      const int = setInterval(() => {
        let actualCard = this.pickCard;
        if (actualCard) {
          this.mutateApp("cardReviserCharged", true);
          this.mutateKey("actualCard", actualCard);
          clearInterval(int);
        }
      }, 200);
      int;
    },
    setWin(win = null) {
      this.actualCard.win = win;
      if (this.$store.state.app.fastMode) this.submitCard();
      else this.winSetted = true;
    },
    async submitCard() {
      await this.handleSubmit().then(() => this.$emit("submitted"));
    },
  },
  async mounted() {
    this.setActualCard();
  },
  unmounted() {
    this.mutateApp("cardReviserCharged", false);
  },
  watch: {
    cardChronoCheck() {
      this.chrono = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer button {
  width: 30%;
}
</style>
