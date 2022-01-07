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
    deckSelected() {
      return this.$store.state.app.deckSelected;
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
        // cause setState in $store use Object.assign which briefly delete the $stroe.state, causing this.DarkMode = undefined
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
    userId() {
      if (this.userId) this.$router.push({ name: "Library" });
    },
  },
};
</script>
