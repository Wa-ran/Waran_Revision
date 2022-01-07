<template>
  <div
    class="modal fade"
    id="modal"
    tabindex="-1"
    aria-labelledby="modalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content bg-body">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitle">{{ modalState.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-html="modalState.text"></div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <slot name="button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  computed: {
    modalState() {
      return this.$store.state.modal;
    },
  },
};
</script>
