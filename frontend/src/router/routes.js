import { isLoggedIn } from "../middlewares/isLoggedIn";

export default [
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "AppLayoutHeader" },
    children: [],
  },
  {
    path: "/:id",
    name: "EditPizza",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "AppLayoutHeader" },
    children: [],
  },
  {
    path: "/sign-in",
    name: "LoginView",
    component: () => import("../views/LoginView.vue"),
    meta: { layout: "AppLayoutDefault" },
    children: [],
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("../views/CartView.vue"),
    meta: { layout: "AppLayoutHeader" },
    children: [],
  },
  {
    path: "/user",
    name: "UserView",
    component: () => import("../views/UserView.vue"),
    meta: { layout: "AppLayoutUser", middlewares: [isLoggedIn] },
    children: [
      {
        path: "profile",
        name: "ProfileView",
        component: () => import("../views/ProfileView.vue"),
      },
      {
        path: "orders",
        name: "OrdersView",
        component: () => import("../views/OrdersView.vue"),
      },
    ],
  },
  {
    path: "/success",
    name: "success",
    component: () => import("../views/SuccessView.vue"),
    meta: { layout: "AppLayoutDefault" },
    children: [],
  }
];
