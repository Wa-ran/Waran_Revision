import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

function lazyLoad(view) {
  return () =>
    import(
      /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${view}.vue`
    );
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "library",
        name: "Library",
        component: lazyLoad("Library"),
        children: [
          {
            path: "deck-:deck",
            name: "DeckView",
            component: lazyLoad("DeckView"),
            props: true,
            children: [
              {
                path: "modification",
                name: "ModifDeck",
                component: lazyLoad("Modification"),
              },
              {
                path: "revision",
                name: "Revision",
                component: lazyLoad("Revision"),
              },
            ],
          },
          {
            path: "card-:card",
            name: "CardView",
            component: lazyLoad("CardView"),
            props: true,
            children: [
              {
                path: "modification",
                name: "ModifCard",
                component: lazyLoad("Modification"),
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
