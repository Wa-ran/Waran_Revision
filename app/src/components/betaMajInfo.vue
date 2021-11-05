<template>
  <div class="container">
    <button @click="show = !show">
      <span class="italic">{{ date }}</span>
    </button>
    <div v-if="show">
      <div>
        <h4>Bugs réglés :</h4>
        <ul>
          <li v-for="(text, index) of bugs" :key="index" v-html="text"></li>
        </ul>
      </div>
      <div>
        <h4>Amméliorations :</h4>
        <ul>
          <li
            v-for="(text, index) of improvements"
            :key="index"
            v-html="text"
          ></li>
        </ul>
      </div>
      <div>
        <h4>Bugs restants :</h4>
        <ul>
          <li v-for="(text, index) of todo" :key="index" v-html="text"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BetaMajInfo",
  data() {
    return {
      show: false,
    };
  },
  props: {
    defaultShow: { type: Boolean, default: false },
    date: String,
    bugs: Array,
    improvements: Array,
    todo: Array,
  },
  mounted() {
    this.show = this.defaultShow;
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1rem;
  & > div {
    padding-left: 1rem;
  }
}
</style>
