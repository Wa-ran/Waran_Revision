<script>
export default {
  name: "app",
  data() {
    return {
      storeReset: null,
    };
  },
  computed: {
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
    this.storeReset = { ...this.$store.state };
    if (!this.userId) this.$router.push("");
  },
  watch: {
    deckCharged() {
      this.mutateApp(
        "randomCardPick",
        this.deckCharged ? !this.$store.getters.actualDeck.sequence : true
      );
    },
    disconnect() {
      if (this.disconnect) this.mutateStore("setState", this.storeReset);
    },
    userId() {
      if (this.userId) this.$router.push("library");
    },
  },
};
</script>