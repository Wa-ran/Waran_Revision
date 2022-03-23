<template>
  <div
    class="modal fade mt-5"
    id="modal"
    tabindex="-1"
    aria-labelledby="modalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div
        class="position-relative modal-content bg-body border border-primary p-3"
      >
        <div class="modal-header border-primary pt-0">
          <h5 class="modal-title text-center w-100" id="modalTitle">
            {{ modalState.title }}
          </h5>
          <div
            class="position-absolute top-0 end-0 mt-n2 me-n2 bg-body border border-primary rounded closeCustom"
          >
            <button
              @click="modalAnswer = false"
              type="button"
              class="position-absolute btn-close opacity-100 ms-n2"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>

        <div
          v-if="modalState.text"
          class="modal-body"
          v-html="modalState.text"
        ></div>

        <div
          class="modal-footer border-primary pb-0"
          :class="modalState.button ? 'justify-content-center' : ''"
        >
          <button
            v-if="modalState.button"
            @click="modalAnswer = true"
            type="button"
            class="btn btn-primary me-3"
            data-bs-dismiss="modal"
          >
            {{ modalState.button }}
          </button>
          <button
            @click="modalAnswer = false"
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            {{ modalState.button ? "Annuler" : "Fermer" }}
          </button>
        </div>

        <div v-if="this.$store.state.user.id">
          <button
            @click="dontAskagain"
            data-bs-dismiss="modal"
            class="custom btn btn-outline-primary ms-auto mt-3 mb-n2 me-n2 py-0 fst-italic"
          >
            Ne plus me demander
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      modalAnswer: false,
    };
  },
  computed: {
    modalState() {
      return this.$store.state.modal;
    },
  },
  methods: {
    async dontAskagain() {
      this.mutateApp("hideFormModal", true);
      this.mutateKey("user", { hide_form_modal: true });
      await this.$store
        .dispatch("putUser", this.user)
        .then(() => (this.modalAnswer = true));
    },
  },
  mounted() {
    let modal = document.getElementById("modal");
    modal.addEventListener("show.bs.modal", () => {
      this.mutateKey("modalAnswer", null);
      this.mutateKey("modalDisplay", true);
    });
    modal.addEventListener("hidden.bs.modal", () => {
      this.mutateKey("modal", {});
      this.mutateKey("modalAnswer", this.modalAnswer);
      this.mutateKey("modalDisplay", false);
    });
  },
};
</script>

<style lang="scss" scoped>
.custom {
  font-size: 0.9rem;
}
.closeCustom {
  padding: 0.75rem;
}
</style>
