<template>
  <div class="doodle">
    <css-doodle
      v-if="!darkMode"
      :seed="$store.state.user.id"
      class="w-100 h-100"
    >
      @grid: 20 / 18rem; transform: rotate(@r(±90deg)) scale(calc(1 + @r(±0.6)))
      translate(@r(±5px), @r(±5px)); background-color: rgba(calc(253 +
      ((@index/400)*2)), calc(126 + ((@index/400)*129)), calc(20 +
      ((@index/400)*235))); opacity: calc(0.8 + @r(±0.2));
    </css-doodle>
    <css-doodle v-else :seed="$store.state.user.id" class="w-100 h-100">
      @grid: 20 / 18rem; transform: rotate(@r(±90deg)) scale(calc(1 + @r(±0.6)))
      translate(@r(±5px), @r(±5px)); background-color: rgba(calc(253 -
      ((@index/400)*253)), calc(126 - ((@index/400)*126)), calc(20 -
      ((@index/400)*20))); opacity: calc(0.8 + @r(±0.2));
    </css-doodle>
    <!-- <css-doodle
      v-if="!darkMode"
      :seed="$store.state.user.id"
      class="w-100 h-100"
    >
      @grid: 16 / 18rem; transform: rotate(@r(±90deg)) scale(calc(1 + @r(±0.7)))
      translate(@r(±5px), @r(±5px)); background-color: rgba(calc(253 +
      ((@index/256)*2)), calc(126 + ((@index/256)*129)), calc(20 +
      ((@index/256)*235))); opacity: calc(0.7 + @r(±0.2));
    </css-doodle>
    <css-doodle v-else :seed="$store.state.user.id" class="w-100 h-100">
      @grid: 16 / 18rem; transform: rotate(@r(±90deg)) scale(calc(1 + @r(±0.7)))
      translate(@r(±5px), @r(±5px)); background-color: rgba(calc(253 -
      ((@index/256)*253)), calc(126 - ((@index/256)*126)), calc(20 -
      ((@index/256)*20))); opacity: calc(0.7 + @r(±0.2));
    </css-doodle> -->
    <!-- <css-doodle :seed="$store.state.user.id">
      @grid: 16 / 18rem; transform: rotate(@r(±90deg)) scale(@r(±2.0))
      translate(@r(±5px), @r(±5px)); opacity: calc(0.5 - 1 / 400 * @index);
      background: #fd7e14;
    </css-doodle> -->
    <!-- <css-doodle>
      @grid: 32 / 18rem; @size: 1px calc(35px + 70%); transform:
      rotate(@r(±90deg)) translateY(@r(-50px)); opacity: calc(1 - 1 / 900 *
      @index); background: #fd7e14;
    </css-doodle> -->
  </div>
</template>

<script>
export default {
  name: "Doodle",
  computed: {
    darkMode() {
      return this.$store.state.app.darkMode;
    },
  },
  mounted() {
    let doodles = document.querySelectorAll(".doodle");
    for (let doodle of doodles) {
      if (doodle.scrollWidth > doodle.scrollHeight)
        doodle.style.height = doodle.scrollWidth + "px";
      else doodle.style.width = doodle.scrollHeight + "px";
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.doodle {
  position: absolute;
  // top: -5px;
  bottom: -5px;
  left: -5px;
  // right: -2px;
  width: 101%;
  height: 101%;
}
</style>
