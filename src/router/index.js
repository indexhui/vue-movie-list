import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("../views/Favorite.vue"),
  },
  {
    path: "/movie/:id",
    name: "Movie_id",
    component: () => import("../views/Movie/_id.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
