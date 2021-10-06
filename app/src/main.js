import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShare,
  faBold,
  faItalic,
  faUnderline,
  faUndo,
  faStrikethrough,
  faTint,
  faCircle,
  faCheck,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { CssDoodle } from "css-doodle";

library.add(
  faShare,
  faBold,
  faItalic,
  faUnderline,
  faUndo,
  faStrikethrough,
  faTint,
  faCircle,
  faCheck,
  faTrashAlt
);

const VueApp = createApp(App);
VueApp.component("font-awesome-icon", FontAwesomeIcon);
VueApp.component("css-doodle", CssDoodle);
VueApp.use(store).use(router);

VueApp.mount("#app");
