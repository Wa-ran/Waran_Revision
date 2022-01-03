import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faBold,
  faCaretDown,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCog,
  faHistory,
  faItalic,
  faMoon,
  faQuestion,
  faShare,
  faStrikethrough,
  faSun,
  faTimes,
  faTint,
  faTrashAlt,
  faUnderline,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { faHourglass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueMathjax from "vue-mathjax-next";

import "css-doodle";
// import VueCssDoodle from "@luxdamore/vue-css-doodle";
// import "@luxdamore/vue-css-doodle/dist/VueCssDoodle.css";

import Hr from "@/components/customs/Hr.vue";
import Link from "@/components/customs/Link.vue";
// import DoubleCheckButton from "@/components/DoubleCheckButton.vue";

library.add(
  faBars,
  faBold,
  faCaretDown,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCog,
  faHistory,
  faHourglass,
  faItalic,
  faMoon,
  faQuestion,
  faShare,
  faStrikethrough,
  faSun,
  faTimes,
  faTint,
  faTrashAlt,
  faUnderline,
  faUndo
);

const VueApp = createApp(App);

VueApp.config.compilerOptions.isCustomElement = (tag) =>
  tag.startsWith("css-doodle");

VueApp.mixin({
  methods: {
    mutateStore(fct, value) {
      this.$store.dispatch("mutateStore", {
        fct,
        value,
      });
    },
  },
});

VueApp.mixin({
  methods: {
    mutateKey(sKey, body) {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          sKey,
          body,
        },
      });
    },
  },
});

VueApp.mixin({
  methods: {
    mutateApp(appKey, value) {
      let app = { ...this.$store.state.app };
      app[appKey] = value;
      this.mutateKey('app', app);
    },
  },
});

VueApp.mixin({
  methods: {
    setModal(body) {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          sKey: "modal",
          body,
        },
      });
    },
  },
});

VueApp.component("font-awesome-icon", FontAwesomeIcon);
// VueApp.component(VueCssDoodle.name, VueCssDoodle);
VueApp.component("vue-mathjax", VueMathjax);
VueApp.component("cust-hr", Hr);
VueApp.component("cust-a", Link);
// VueApp.component("DoubleCheckButton", DoubleCheckButton);
VueApp.use(store).use(router).use(VueMathjax);

VueApp.mount("#app");
