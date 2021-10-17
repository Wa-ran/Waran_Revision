import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBold,
  faCheck,
  faCircle,
  faHistory,
  faItalic,
  faShare,
  faStrikethrough,
  faTint,
  faTrashAlt,
  faUnderline,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { faHourglass, } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { CssDoodle } from "css-doodle";

import VueMathjax from "vue-mathjax-next";

import DoubleCheckButton from "@/components/DoubleCheckButton.vue";

library.add(
  faBold,
  faCheck,
  faCircle,
  faHistory,
  faHourglass,
  faItalic,
  faShare,
  faStrikethrough,
  faTint,
  faTrashAlt,
  faUnderline,
  faUndo,
);

const VueApp = createApp(App);

VueApp.mixin({
  methods: {
    mutateKey(mutate, body) {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          mutate,
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
