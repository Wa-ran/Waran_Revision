import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { CssDoodle } from "css-doodle";

library.add(faShare);

const VueApp = createApp(App);
VueApp.component("font-awesome-icon", FontAwesomeIcon);
VueApp.component("css-doodle", CssDoodle);
VueApp.use(store).use(router);

VueApp.mount("#app");
