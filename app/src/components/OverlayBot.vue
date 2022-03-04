<template>
  <div class="overlay w-100">
    <div class="position-relative w-100 p-2">
      <!-- AllCards Transfert -->
      <div
        v-if="$store.state.app.allCardsDeckCheck"
        class="d-flex w-fit bg-dark border border-2 border-primary rounded mx-auto p-2"
      >
        <button class="btn btn-success">Valider</button>
        <button
          @click="mutateApp('allCardsDeckCheck', false)"
          class="btn btn-primary ms-2"
        >
          Annuler
        </button>
      </div>

      <!-- AllCards Deletion -->
      <div
        v-if="$store.state.app.allCardsDropCheck"
        class="d-flex w-fit bg-dark border border-2 border-primary rounded mx-auto p-2"
      >
        <button class="btn btn-danger">Supprimer</button>
        <button
          @click="mutateApp('allCardsDropCheck', false)"
          class="btn btn-primary ms-2"
        >
          Annuler
        </button>
      </div>

      <!-- scroll to top button  -->
      <div v-if="!toTop" class="position-absolute bottom-0 end-0 w-fit p-2">
        <button
          @click="goTop"
          class="has-icon bg-dark btn btn-outline-primary border-2 px-2"
        >
          <font-awesome-icon :icon="['fas', 'arrow-up']" size="2x" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Overlay",
  data() {
    return {
      elemScroll: null,
      toTop: true,
    };
  },
  methods: {
    goTop() {
      this.elemScroll.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    document.addEventListener(
      "scroll",
      (e) => {
        this.elemScroll = e.target;
        if (window.innerHeight < e.target.scrollTop * 2) this.toTop = false;
        else this.toTop = true;
      },
      { capture: true }
    );
  },
};
</script>

<style lang="scss" scoped>
.btn.has-icon:hover,
.btn.has-icon:focus {
  color: currentColor !important;
}
</style>
