<template>
  <div class="card">
    <div class="doodle">
      <css-doodle :seed="doodleSeed">
        @grid: 32; @size: 1px calc(35px + 70%); transform: rotate(@r(±90deg));
        background: #e7576a; opacity: calc(1 - 1 / 900 * @index);
      </css-doodle>
    </div>

    <div class="recto">
      <div class="content flex-grow-1">
        <div class="porthole" :style="cardLoad ? 'tabindex: -1' : ''">
          <Loader
            :size="'4x'"
            class="cardLoader highlight"
            :style="
              cardLoad
                ? 'opacity: 1; transform: scale(1)'
                : 'opacity: 0; transform: scale(0)'
            "
          />
          <button
            @click="mutateKey('cardReveal', true)"
            class="cardQuestion icon highlight"
            :style="
              cardLoad
                ? 'opacity: 0; transform: scale(0)'
                : 'opacity: 1; transform: scale(1)'
            "
          >
            <font-awesome-icon :icon="['fas', 'question']" size="4x" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  name: "CardHider",
  components: {
    Loader,
  },
  data() {
    return {
      cardLoad: true,
      doodleSeed: "",
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    loadingState() {
      this.cardLoad = true;
      let stop = setInterval(() => {
        if (!this.loading) {
          this.cardLoad = false;
          clearInterval(stop);
        }
      }, 500);
    },
  },
  mounted() {
    this.loadingState();
    if (!this.doodleSeed) this.doodleSeed = Math.trunc(Math.random) * 1000;
  },
  watch: {
    loading() {
      if (this.loading) this.loadingState();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.porthole {
  & > * {
    transition: opacity 0.3s, transform 0.4s;
  }
}
</style>
