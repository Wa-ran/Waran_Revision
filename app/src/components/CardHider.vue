<template>
  <Card>
    <template v-slot:body>
      <div
        class="container-fluid d-flex h-100 bg-body"
        :style="'background: radial-gradient(circle at 50% 215px, transparent 45px, rgba(var(--bs-body-bg-rgb)) 46px) !important'"
      >
        <Doodle />
        <div
          class="porthole border-2 bg-body border border-primary rounded-circle"
          :class="isLoading ? 'isLoading' : ''"
          style="box-shadow: inset 0 0 1.5rem rgba(var(--bs-body-bg-rgb))"
          :style="isLoading ? 'tabindex: -1' : ''"
        >
          <Loader
            :size="'4x'"
            class="position-absolute"
            :style="
              isLoading
                ? 'opacity: 1; transform: scale(1)'
                : 'opacity: 0; transform: scale(0)'
            "
          />
          <button
            @click="mutateApp('cardReveal', true)"
            class="has-icon"
            :style="
              isLoading
                ? 'opacity: 0; transform: scale(0)'
                : 'opacity: 1; transform: scale(1)'
            "
          >
            <font-awesome-icon :icon="['fas', 'question']" size="4x" />
          </button>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
import Doodle from "@/components/Doodle.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "CardHider",
  components: {
    Card,
    Doodle,
    Loader,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    cardHideCheck() {
      return this.$store.state.app.cardHideCheck;
    },
    cardReviserCharged() {
      return this.$store.state.app.cardReviserCharged;
    },
  },
  methods: {
    reveal() {
      this.cardHideCheck
        ? this.mutateApp("cardReveal", false)
        : this.mutateApp("cardReveal", true);
    },
  },
  mounted() {
    this.reveal();
  },
  watch: {
    cardHideCheck() {
      if (!this.cardHideCheck) this.mutateApp("cardReveal", true);
    },
    cardReviserCharged() {
      if (this.cardReviserCharged) this.isLoading = false;
      else this.isLoading = true;
      this.reveal();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

button:focus {
  box-shadow: none !important;
}

.porthole {
  & > * {
    transition: opacity 0.3s, transform 0.4s;
  }
}

.container-fluid {
  position: relative;
  & .porthole {
    position: absolute;
    top: 169px;
    left: 96px;
    width: 92px;
    height: 92px;
    & > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}

.porthole:not(.isLoading):hover {
  border-color: currentColor !important;
  & button {
    color: currentColor !important;
  }
}
.porthole.isLoading:hover {
  border-color: $primary !important;
}

// .porthole:not(.isLoading):focus-within {
//   box-shadow: 0 0 0 0.25rem rgba($primary, 0.5) !important;
// }
</style>
