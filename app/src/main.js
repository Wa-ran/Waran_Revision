import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBold,
  faCaretDown,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faHistory,
  faItalic,
  faQuestion,
  faShare,
  faStrikethrough,
  faTint,
  faTrashAlt,
  faUnderline,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { faHourglass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { CssDoodle } from "css-doodle";

import VueMathjax from "vue-mathjax-next";

import DoubleCheckButton from "@/components/DoubleCheckButton.vue";

library.add(
  faBold,
  faCaretDown,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faHistory,
  faHourglass,
  faItalic,
  faQuestion,
  faShare,
  faStrikethrough,
  faTint,
  faTrashAlt,
  faUnderline,
  faUndo
);

const VueApp = createApp(App);

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

VueApp.component("font-awesome-icon", FontAwesomeIcon);
VueApp.component("css-doodle", CssDoodle);
VueApp.component("vue-mathjax", VueMathjax);
VueApp.component("DoubleCheckButton", DoubleCheckButton);
VueApp.use(store).use(router);

VueApp.mount("#app");
