<template>
  <form
    class="d-flex flex-column justify-content-center align-items-center w-100 h-100 p-3"
  >
    <h2 class="fs-1 fst-italic">Global</h2>
    <div class="d-flex flex-grow-1 mt-5 w-100 h-100">
      <textarea
        v-model="object"
        class="form-control border-primary w-100 h-100"
        placeholder="object"
        id="global"
      ></textarea>
    </div>

    <div class="d-flex m-5">
      <button @click="submitForm" type="button" class="btn btn-primary ms-2">
        Envoyer
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Global",
  data() {
    return {
      object: null,
    };
  },
  methods: {
    async submitForm() {
      await this.$store.dispatch("global", this.object);
    },
  },
  mounted() {
    if (this.$store.state.user.id !== 2) this.$router.push("/");
  },
};
</script>

<style lang="scss" scoped>
form {
  min-width: 90vw !important;
}
textarea {
  min-height: 40vh !important;
}
</style>
