import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap';
import { Tooltip } from "bootstrap";

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
import {
  faHourglass,
  faMinusSquare,
  faPlusSquare,
  faQuestionCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueMathjax from "vue-mathjax-next";

import "css-doodle";
// import VueCssDoodle from "@luxdamore/vue-css-doodle";
// import "@luxdamore/vue-css-doodle/dist/VueCssDoodle.css";

import Hr from "@/components/global/Hr.vue";
import Link from "@/components/global/Link.vue";
import Title from "@/components/global/Title.vue";
import ToolTip from "@/components/global/ToolTip.vue";
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
  faMinusSquare,
  faMoon,
  faPlusSquare,
  faQuestion,
  faQuestionCircle,
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
      if (typeof body === "object" && !Array.isArray(body) && body !== null) {
        let sObj = { ...this.$store.state[sKey] };
        body = Object.assign(sObj, body);
      }
      this.mutateStore("mutateKey", { sKey, body });
    },
  },
});

VueApp.mixin({
  methods: {
    mutateApp(appKey, value) {
      let app = { ...this.$store.state.app };
      app[appKey] = value;
      this.mutateStore("mutateKey", { sKey: "app", body: app });
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

// const bootstrap = new bootstrap
const bsTooltip = (el, binding) => {
  const t = ["hover", "focus", "click"];

  new Tooltip(el, {
    title: binding.value,
    placement: binding.arg || "top",
    trigger: t.join(" "),
    html: true,
  });
};

VueApp.directive("tooltip", {
  beforeMount(el, binding) {
    bsTooltip(el, binding);
  },
  updated(el, binding) {
    bsTooltip(el, binding);
  },
  unmounted(el) {
    new Tooltip(el).dispose();
  },
});

// const bootstrap = new bootstrap
const bsTooltipStretch = (el, binding) => {
  const t = ["hover", "focus"];

  new Tooltip(el, {
    title: binding.value,
    placement: binding.arg || "top",
    trigger: t.join(" "),
    html: true,
    delay: { show: 500, hide: 0 },
  });
};

VueApp.directive("tooltip-stretch", {
  beforeMount(el, binding) {
    bsTooltipStretch(el, binding);
  },
  updated(el, binding) {
    bsTooltipStretch(el, binding);
  },
  unmounted(el) {
    new Tooltip(el).dispose();
  },
});

VueApp.component("font-awesome-icon", FontAwesomeIcon);
// VueApp.component(VueCssDoodle.name, VueCssDoodle);
VueApp.component("vue-mathjax", VueMathjax);
VueApp.component("cust-hr", Hr);
VueApp.component("cust-a", Link);
VueApp.component("cust-title", Title);
VueApp.component("cust-tooltip", ToolTip);
// VueApp.component("DoubleCheckButton", DoubleCheckButton);
VueApp.use(store).use(router).use(VueMathjax);

VueApp.mount("#app");
