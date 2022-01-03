import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

function lazyLoad(view) {
  return () => import(/* webpackPrefetch: true */ /* webpackPreload: true */`@/views/${view}.vue`)
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
        component: lazyLoad('Library'),
      },
      {
        path: "deck/:deck",
        name: "DecksMenu",
        component: lazyLoad('DeckView'),
        props: true,
        children: [
          {
            path: "revision",
            name: "Revision",
            component: lazyLoad('Revision'),
          },
        ]
      },

    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
