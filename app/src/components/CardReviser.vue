<template>
  <div class="w-fit mt-3 mx-auto">
    <CardHider
      class="position-absolute"
      style="z-index: 1000"
      :style="
        $store.state.app.cardHideCheck && !$store.state.app.cardReveal
          ? ''
          : 'z-index: -1'
      "
    />
    <Card>
      <template v-slot:body>
        <div
          v-if="$store.state.app.cardReviserCharged"
          class="d-flex flex-column w-100 h-100 overflow-scroll bg-body"
        >
          <div class="flex-grow-1 d-flex align-items-center p-3">
            <div v-html="actualCard.recto" class="text-center w-100"></div>
          </div>

          <CardChrono
            v-if="$store.state.app.cardReveal"
            :style="$store.state.app.cardChronoCheck ? '' : 'opacity: 0'"
          />
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
      actualCard: null,
    };
  },
  computed: {
    pickCard() {
      return this.$store.getters.pickCard;
    },
  },
  methods: {
    setActualCard() {
      this.mutateApp("cardReviserCharged", false);
      const int = setInterval(() => {
        this.actualCard = this.pickCard;
        if (this.actualCard) {
          this.mutateApp("cardReviserCharged", true);
          clearInterval(int);
        }
      }, 200);
      int;
    },
  },
  async mounted() {
    this.setActualCard();
  },
  unmounted() {
    this.mutateApp("cardReviserCharged", false);
  },
};
</script>
