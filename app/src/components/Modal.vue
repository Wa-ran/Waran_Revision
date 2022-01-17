<template>
  <div
    class="modal fade mt-5"
    id="modal"
    tabindex="-1"
    aria-labelledby="modalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content bg-body">
        <div class="modal-header">
          <h5 class="modal-title text-center w-100" id="modalTitle">
            {{ modalState.title }}
          </h5>
          <button
            @click="modalAnswer = false"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div
          v-if="modalState.text"
          class="modal-body"
          v-html="modalState.text"
        ></div>

        <div
          class="modal-footer"
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
            Fermer
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
    close() {},
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
