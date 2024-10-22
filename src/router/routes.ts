import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/EmptyLayout.vue"),
    children: [
      // Varsayılan userId olmadan ana sayfa yönlendirmesi
      { path: "", component: () => import("pages/Menu.vue") },
    ],
  },
  {
    // Dinamik userId parametresi ile menu yönlendirmesi
    path: "/menu/:userId?",
    component: () => import("layouts/EmptyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Menu.vue"),
      },
    ],
  },
  {
    // Login sayfası yönlendirmesi
    path: "/login",
    component: () => import("src/layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }],
  },
  {
    // Admin sayfası yönlendirmesi
    path: "/admin",
    component: () => import("pages/Admin.vue"),
    children: [{ path: "", component: () => import("pages/Admin.vue") }],
  },
  {
    // Admin sayfası yönlendirmesi
    path: "/test",
    component: () => import("pages/test.vue"),
    children: [{ path: "", component: () => import("pages/test.vue") }],
  },
  // Bilinmeyen rotalar için 404 sayfası
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
