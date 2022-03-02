<template>
  <div class="chrono text-primary w-100">
    <div class="indicator">
      <font-awesome-icon :icon="['fas', 'caret-down']" size="lg" />
    </div>
    <div class="parkour">
      <div><Loader :size="'lg'" :antiHour="true" /></div>
      <div v-for="index of 10" :key="index" class="point"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardChrono",
  methods: {
    chrono() {
      let container = document.querySelector(".chrono");
      let indicator = document.querySelector(".indicator");
      let points = document.querySelectorAll(".parkour > *");
      indicator.style.cssText = `
        transition: transform ${points.length}s linear, opacity 0.5s ${
        points.length - 1.5
      }s;
        transform: translateX(-${
          container.scrollWidth - indicator.scrollWidth
        }px);
        opacity: 0;
        `;
      for (let index of points.keys()) {
        points[index].style.cssText = `
          transition: all 0.3s ${points.length - index - 1}s;
          opacity: 0;`;
      }
      points[0].style.cssText += "transform: scale(0)";
    },
  },
  mounted() {
    this.chrono();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.chrono {
  position: relative;
}
.indicator {
  margin-left: auto;
  margin-bottom: auto;
  padding-bottom: 1.5rem;
  width: fit-content;
}
.parkour {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.point {
  min-height: 5px;
  min-width: 5px;
  height: 5px;
  width: 5px;
  border-radius: 100%;
  background-color: $primary;
  margin: 0 7px;
}
</style>
