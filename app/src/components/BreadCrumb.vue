<template>
  <div>
    <div class="breadCrumb">
      <div
        class="mt-n2 pt-2 w-100 d-flex flex-wrap rounded position-relative"
        aria-label="Breadcrumb"
      >
        <div v-for="(link, index) in breadCrumb" :key="index">
          <span class="ml-2">-</span>
          <router-link
            :to="link.path"
            :title="decodeURIComponent(link.name)"
            :class="lastBreadClass(index)"
          >
            {{ breadName(link.name, index) }}
          </router-link>
        </div>
      </div>
    </div>

    <button
      v-if="$route.name !== 'Home'"
      @click="$router.push(retourLink)"
      class="ml-auto mt-n2 pt-2"
    >
      Retour
    </button>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  data() {
    return {
      scrollPos: 0,
    };
  },
  computed: {
    breadCrumb() {
      let list = this.$route.path.replace("/", "").split("/");
      let link = [];
      let path = "";
      for (let name of list) {
        let pair = {};
        path = path + "/" + name;
        pair["name"] = name;
        pair["path"] = path;
        link.push(pair);
      }
      return link;
    },
    retourLink() {
      let link = Object.values(this.breadCrumb)[
        Object.keys(this.breadCrumb).length - 2
      ].path;
      return link;
    },
  },
  methods: {
    breadName(name, index) {
      let props = this.$route.params.participation;
      let text = decodeURIComponent(name);
      if (props && index == Object.keys(this.breadCrumb).length - 1) {
        return "Participation";
      } else {
        return text;
      }
    },
    lastBreadClass(index) {
      if (index == Object.keys(this.breadCrumb).length - 1) {
        return "disabled";
      }
    },
    listenScroll() {
      setTimeout(() => {
        document.getElementById("app").addEventListener(
          "scroll",
          () => {
            this.breadCrumbHide(event);
          },
          { once: true }
        );
      }, 100);
    },
    breadCrumbHide(event) {
      // Hide on scroll top
      let bc = document.querySelector(".breadCrumb");
      if (event.target.scrollTop > this.scrollPos)
        bc.style.marginTop = "-" + bc.scrollHeight + "px";
      else bc.style.marginTop = 0;
      this.scrollPos = event.target.scrollTop;
      this.listenScroll();
    },
  },
  mounted() {
    this.listenScroll();
  },
};
</script>