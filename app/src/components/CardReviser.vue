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
        <div class="w-100 h-100 overflow-scroll bg-body">
          {{ actualCard }}
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card";
import CardHider from "@/components/CardHider";

export default {
  name: "revision",
  components: {
    Card,
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
    cardHiderKey() {
      return this.$store.state.app.cardHiderKey;
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
    this.mutateApp("cardHiderKey", this.cardHiderKey + 1);
    this.setActualCard();
  },
  unmounted() {
    this.mutateApp("cardReviserCharged", false);
  },
};
</script>
