export default [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      children: [],
      meta: { layout: "AppLayoutDefault" },
    },
  ];