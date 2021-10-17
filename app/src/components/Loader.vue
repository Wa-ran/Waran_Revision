<template>
  <div class="container">
    <div class="loader">
      <font-awesome-icon
        :icon="['far', 'hourglass']"
        :class="'fa-' + size"
        class="hourglass"
      />
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    size: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.loader {
  width: fit-content;
  height: fit-content;
  margin: auto;

  position: relative;
  animation: rotate 1.5s 0.1s infinite ease-in-out both;
  & .top {
    position: absolute;
    top: 15%;
    left: 25%;
    width: 50%;
    height: 25%;
    border-radius: 0 0 50% 50% / 0 0 80% 80%;
    overflow: hidden;
    // clip-path: polygon(0% 25%, 0% 100%, 100% 100%, 100% 25%);
    &::after {
      position: absolute;
      content: "";
      top: -5%;
      left: -5%;
      width: 110%;
      height: 110%;
      background-color: currentColor;
      // border-radius: 0 0 50% 50% / 0 0 80% 80%;
      transform: translateY(20%);
      animation: flow 1.5s 0.1s infinite ease-out both;
    }
  }
  & .bottom {
    position: absolute;
    top: 61%;
    left: 25%;
    width: 50%;
    height: 25%;
    border-radius: 50% 50% 10% 10% / 80% 80% 5% 5%;
    overflow: hidden;
    // clip-path: polygon(0% 25%, 0% 100%, 100% 100%, 100% 25%);
    &::after {
      position: absolute;
      content: "";
      top: -5%;
      left: -5%;
      width: 110%;
      height: 110%;
      background-color: currentColor;
      // border-radius: 50% 50% 10% 10% / 80% 80% 5% 5%;
      animation: fill 1.5s 0.1s infinite ease-out both;
    }
  }
}
@keyframes flow {
  0% {
    // clip-path: polygon(0% 25%, 0% 100%, 100% 100%, 100% 25%);
    transform: translateY(25%);
  }
  80%,
  100% {
    // clip-path: polygon(0% 100%, 0% 100%, 100% 100%, 100% 100%);
    transform: translateY(100%);
  }
}
@keyframes fill {
  0%,
  5% {
    // clip-path: polygon(0% 100%, 0% 100%, 100% 100%, 100% 100%);
    transform: translateY(100%);
  }
  80%,
  85% {
    // clip-path: polygon(0% 25%, 0% 100%, 100% 100%, 100% 25%);
    transform: translateY(25%);
  }
  100% {
    // clip-path: polygon(0% 0%, 0% 75%, 100% 75%, 100% 0%);
    transform: translateY(-25%);
  }
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  80% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
  }
}
</style>
