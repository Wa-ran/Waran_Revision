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
    loading() {
      return this.$store.state.loading;
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
      this.mutateApp("windowSize", "reactive");
      this.mutateApp("windowSize", size);
    },
  },
  mounted() {
    this.windowSize();
    window.addEventListener("resize", () => {
      this.windowSize();
    });
    this.storeReset = { ...this.$store.state };
    if (
      !this.user.id &&
      document.URL.indexOf("/ninja") === -1 &&
      document.URL.indexOf("/global") === -1
    )
      this.$router.push({ name: "Home" });
    this.mutateApp("darkMode", null);
  },
  watch: {
    actualCard() {
      if (!this.loading)
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
      if (!this.cardsListCharged) {
        this.mutateKey("cardsReservedList", []);
        this.mutateKey("cardsToReviseBaseList", []);
      }
    },
    // cardReviserCharged() {
    //   this.mutateStore("mergeReservedCards");
    // },
    darkMode() {
      if (this.storeReset && this.darkMode !== undefined) {
        // because setState in $store use Object.assign which briefly delete the $store.state, causing this.DarkMode = undefined
        this.storeReset.app.darkMode = this.darkMode;
      }
      if (
        this.darkMode === null &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return this.mutateApp("darkMode", true);
      }
      if (this.darkMode) document.documentElement.className = "dark";
      else document.documentElement.className = "light";
    },
    deckSelected() {
      if (this.deckSelected)
        this.mutateKey("actualDeck", this.$store.getters.actualDeck);
      else this.mutateKey("actualDeck", {});
      this.mutateApp(
        "randomCardPick",
        this.deckSelected ? !this.$store.state.actualDeck.sequence : true
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
          cardFastCheck: this.user.fast_mode,
          darkMode:
            this.user.dark_mode === null ? this.darkMode : this.user.dark_mode,
          hideFormModal: this.user.hide_form_modal,
        });
      }
    },
  },
};
</script>
