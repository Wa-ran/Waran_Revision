<template>
  <div v-if="showModalState" class="modal">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Modal",
  computed: {
    showModalState() {
      return this.$store.state.showModal;
    },
  },
  // mounted() {
  //   let header = document.querySelector("#home > header");
  //   let modal = document.querySelector(".modal");
  //   // let cont = document.querySelector(".modal > *");
  //   // console.log(header.scrollHeight);
  //   if (modal) {
  //     modal.style.cssText = `min-height: calc(100vh - ${header.scrollHeight}px); top: ${header.scrollHeight}px`;
  //     // modal.style.cssText = `margin-top: calc(2rem + ${header.scrollHeight}px)`;
  //   }
  // },
};
</script>

<style lang="scss">
@import "../styles/variables";

.modal {
  position: absolute;
  top: 53px;
  bottom: 0;
  left: 0;
  z-index: 1000;
  min-width: 100%;
  min-height: calc(100vh - 50px);
  & > * {
    min-width: 100%;
    min-height: 100vh;
    margin: auto;
    padding: 0;
    background-color: $dark_bgc;
    box-shadow: inset 0 0 80px 50px $bgc;
    transition: opacity 0.5s;
    & > .container {
      min-width: 100%;
      min-height: 100%;
      margin-top: 100px;
    }
  }
}
</style>
