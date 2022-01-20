import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

function lazyLoad(view) {
  return () =>
    import(
      /* webpackPrefetch: true */ /* webpackPreload: true */ `@/${view}.vue`
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
        component: lazyLoad("views/Library"),
        children: [
          {
            path: "deck-:deck",
            name: "DeckView",
            component: lazyLoad("views/DeckView"),
            props: true,
            children: [
              {
                path: "modification",
                name: "ModifDeck",
                component: lazyLoad("views/Modification"),
              },
              {
                path: "revision",
                name: "Revision",
                component: lazyLoad("views/Revision"),
              },
              {
                path: "card-:card",
                name: "CardView",
                component: lazyLoad("views/CardView"),
                props: true,
                children: [
                  {
                    path: "modification",
                    name: "ModifCard",
                    component: lazyLoad("views/Modification"),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "profil",
        name: "ModifUser",
        component: lazyLoad("views/Modification"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
