<script>
export default {
  name: "app",
  data() {
    return {
      storeReset: null,
    };
  },
  computed: {
    darkMode() {
      return this.$store.state.app.darkMode;
    },
    deckCharged() {
      return this.$store.state.app.deckCharged;
    },
    disconnect() {
      return this.$store.state.app.actionDisconnect;
    },
    userId() {
      return this.$store.state.user.id;
    },
  },
  mounted() {
    setTimeout(() => {
      // wait for user preferences (darkMode)
      this.storeReset = { ...this.$store.state };
    }, 200);
    if (!this.userId) this.$router.push({ name: "Home" });
  },
  watch: {
    darkMode() {
      if (this.storeReset && this.darkMode !== undefined) {
        this.storeReset.app.darkMode = this.darkMode;
      }
    },
    deckCharged() {
      this.mutateApp(
        "randomCardPick",
        this.deckCharged ? !this.$store.getters.actualDeck.sequence : true
      );
    },
    disconnect() {
      if (this.disconnect) {
        this.mutateStore("setState", this.storeReset);
        this.$router.push({ name: "Home" });
      }
    },
    userId() {
      if (this.userId) this.$router.push({ name: "Library" });
    },
  },
};
</script>