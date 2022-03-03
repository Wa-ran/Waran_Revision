<script>
export default {
  name: "app",
  data() {
    return {
      storeReset: null,
    };
  },
  computed: {
    actualCard() {
      return this.$store.state.actualCard;
    },
    cardChronoCheck() {
      return this.$store.state.app.cardChronoCheck;
    },
    cardHideCheck() {
      return this.$store.state.app.cardHideCheck;
    },
    cardsListCharged() {
      return this.$store.state.app.cardsListCharged;
    },
    cardHiderKey() {
      return this.$store.state.app.cardHiderKey;
    },
    cardReviserCharged() {
      return this.$store.state.app.cardReviserCharged;
    },
    darkMode() {
      return this.$store.state.app.darkMode;
    },
    deckSelected() {
      return this.$store.state.app.deckSelected;
    },
    disconnect() {
      return this.$store.state.app.actionDisconnect;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    windowSize() {
      let size = window.innerWidth;
      if (size < 576) size = "xs";
      else if (size < 768) size = "sm";
      else if (size < 992) size = "md";
      else if (size < 1200) size = "lg";
      else if (size < 1400) size = "xl";
      else size = "xxl";
      this.mutateApp("windowSize", size);
    },
  },
  mounted() {
    this.windowSize();
    window.addEventListener("resize", this.windowSize());
    setTimeout(() => {
      // wait for user preferences (darkMode)
      this.storeReset = { ...this.$store.state };
    }, 200);
    if (!this.user.id) this.$router.push({ name: "Home" });
  },
  watch: {
    actualCard() {
      this.mutateApp(
        "actualCardChange",
        this.$store.state.app.actualCardChange + 1
      );
    },
    cardChronoCheck() {
      if (this.cardChronoCheck && !this.cardHideCheck)
        this.mutateApp("cardHideCheck", true);
    },
    cardHideCheck() {
      if (this.cardHideCheck)
        this.mutateApp("cardHiderKey", this.cardHiderKey + 1);
      if (!this.cardHideCheck && this.cardChronoCheck)
        this.mutateApp("cardChronoCheck", false);
    },
    cardsListCharged() {
      this.mutateKey("cardsToReviseReserved", []);
    },
    cardReviserCharged() {
      this.mutateStore("mergeReservedCards");
    },
    darkMode() {
      if (this.storeReset && this.darkMode !== undefined) {
        // because setState in $store use Object.assign which briefly delete the $store.state, causing this.DarkMode = undefined
        this.storeReset.app.darkMode = this.darkMode;
      }
    },
    deckSelected() {
      this.mutateApp(
        "randomCardPick",
        this.deckSelected ? !this.$store.getters.actualDeck.sequence : true
      );
    },
    disconnect() {
      if (this.disconnect) {
        this.mutateStore("setState", this.storeReset);
        this.$router.push({ name: "Home" });
      }
    },
    user() {
      if (this.user.id) {
        this.mutateKey("app", {
          cardHideCheck: this.user.hide_card,
          cardChronoCheck: this.user.chrono_card,
          darkMode:
            this.user.dark_mode === null ? this.darkMode : this.user.dark_mode,
          fastMode: this.user.fast_mode,
        });
      }
    },
  },
};
</script>
