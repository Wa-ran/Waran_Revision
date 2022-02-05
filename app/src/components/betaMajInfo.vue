<template>
  <div class="container">
    <button
      type="button"
      @click="show = !show"
      class="btn btn-primary mb-2 py-0"
    >
      <span class="italic">{{ date }}</span>
    </button>
    <div v-if="show" class="ms-3">
      <div v-if="bugs.length > 0">
        <h3 class="fs-5">Bugs réglés :</h3>
        <ul>
          <li v-for="(text, index) of bugs" :key="index" v-html="text"></li>
        </ul>
      </div>
      <div v-if="improvements.length > 0">
        <h3 class="fs-5">Amméliorations :</h3>
        <ul>
          <li
            v-for="(text, index) of improvements"
            :key="index"
            v-html="text"
          ></li>
        </ul>
      </div>
      <div v-if="todos.length > 0">
        <h3 class="fs-5">Bugs restants :</h3>
        <ul>
          <li v-for="(text, index) of todos" :key="index" v-html="text"></li>
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
    todos: Array,
  },
  mounted() {
    this.show = this.defaultShow;
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 767px) {
  ul {
    padding-left: 1.5rem;
  }
}
</style>
