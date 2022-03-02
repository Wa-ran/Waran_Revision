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
    meta: { desc: "Accueil" },
    component: Home,
    children: [
      {
        path: "library",
        name: "Library",
        meta: { desc: "Vos decks" },
        component: lazyLoad("views/Library"),
        children: [
          {
            path: "deck-:deck",
            name: "DeckView",
            meta: { desc: "Deck" },
            component: lazyLoad("views/DeckView"),
            props: true,
            children: [
              {
                path: "all-cards",
                name: "AllCards",
                meta: { desc: "Toutes les cartes" },
                component: lazyLoad("views/AllCards"),
              },
              {
                path: "new-card",
                name: "NewCard",
                meta: { desc: "Création de carte" },
                component: lazyLoad("views/Modification"),
              },
              {
                path: "modification",
                name: "ModifDeck",
                meta: { desc: "Modifier un deck" },
                component: lazyLoad("views/Modification"),
              },
              {
                path: "revision",
                name: "Revision",
                meta: { desc: "Révision" },
                component: lazyLoad("views/Revision"),
              },
              {
                path: "card-:card",
                name: "CardView",
                meta: { desc: "Carte" },
                component: lazyLoad("views/CardView"),
                props: true,
                children: [
                  {
                    path: "modification",
                    name: "ModifCard",
                    meta: { desc: "Modifier une carte" },
                    component: lazyLoad("views/Modification"),
                  },
                ],
              },
            ],
          },
          {
            path: "new-deck",
            name: "NewDeck",
            meta: { desc: "Création de deck" },
            component: lazyLoad("views/Modification"),
          },
        ],
      },
      {
        path: "profil",
        name: "ModifUser",
        meta: { desc: "Mon profil" },
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
