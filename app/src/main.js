import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap';
import { Collapse, Modal, Tooltip } from "bootstrap";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBars,
  faBold,
  faCamera,
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

import MasonryWall from "@yeger/vue-masonry-wall";

import "css-doodle";
// import VueCssDoodle from "@luxdamore/vue-css-doodle";
// import "@luxdamore/vue-css-doodle/dist/VueCssDoodle.css";

import Hr from "@/components/global/Hr.vue";
import Link from "@/components/global/Link.vue";
import Title from "@/components/global/Title.vue";
import ToolTip from "@/components/global/ToolTip.vue";
import ButtonTopRight from "@/components/global/ButtonTopRight.vue";
import DoubleCheckButton from "@/components/global/DoubleCheckButton.vue";
import Loader from "@/components/global/Loader.vue";
import Options from "@/components/global/Options.vue";
import CardImage from "@/components/global/CardImage.vue"

library.add(
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBars,
  faBold,
  faCamera,
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
    mutateKey(sKey, body) {
      if (typeof body === "object" && !Array.isArray(body) && body !== null) {
        let sObj = { ...this.$store.state[sKey] };
        body = Object.assign(sObj, body);
      }
      this.mutateStore("mutateKey", { sKey, body });
    },
    mutateApp(appKey, value) {
      let app = { ...this.$store.state.app };
      app[appKey] = value;
      this.mutateStore("mutateKey", { sKey: "app", body: app });
    },
    hideNavbar() {
      new Collapse(document.getElementById("HeaderNav"), {});
    },
    displayModal() {
      new Modal(document.getElementById("modal"), {}).show();
    },
    setModal(body) {
      this.$store.dispatch("mutateStore", {
        fct: "mutateKey",
        value: {
          sKey: "modal",
          body,
        },
      });
    },
    verifUnsavedChange() {
      return new Promise((res) => {
        // setTimeout(() => {
        if (
          JSON.stringify(this.$store.state.formCompare.source) !==
          JSON.stringify(this.$store.state.formCompare.modified)
        ) {
          this.setModal({
            title: "Quitter sans valider les changements ?",
            button: "Continuer",
          });
          this.displayModal();
          this.mutateKey("formCompare", {});
          // Wait for user choice
          const int = setInterval(() => {
            if (!this.$store.state.modalDisplay) {
              clearInterval(int);
              this.mutateApp("isFormPage", false);
              res(this.$store.state.modalAnswer);
            }
          }, 200);
        } else res(true);
        // }, 500);
      });
    },
  },
});

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

const bsTooltipStretch = (el, binding) => {
  const t = ["hover", "focus"];

  new Tooltip(el, {
    title: binding.value,
    placement: binding.arg || "top",
    trigger: t.join(" "),
    html: true,
    delay: { show: 400, hide: 0 },
  });
};

VueApp.directive("tooltip-stretch", {
  beforeMount(el, binding) {
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
VueApp.component("ButtonTopRight", ButtonTopRight);
VueApp.component("DoubleCheckButton", DoubleCheckButton);
VueApp.component("Loader", Loader);
VueApp.component("Options", Options);
VueApp.component("CardImage", CardImage);
VueApp.use(store).use(router).use(VueMathjax).use(MasonryWall);

VueApp.mount("#app");
