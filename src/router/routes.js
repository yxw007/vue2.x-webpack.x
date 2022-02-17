import main from "@/view/main";

export default [
  {
    path: "/",
    alias: ["/main.html"],
    name: "index",
    nav_name: "首页",
    component: main,
    redirect: "/main",
  },
  {
    path: "/",
    alias: ["/about.html"],
    name: "index",
    nav_name: "关于",
    component: () => import("@/view/about"),
    redirect: "/main",
  },
];
