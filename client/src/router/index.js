import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import AnimePage from "../views/AnimePage.vue";
import DetailPage from "../views/DetailPage.vue";
import ProfilePage from "../views/ProfilePage.vue";

const routes = [
  { path: "/", name: "homePage", component: HomePage },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/register", name: "register", component: RegisterPage },
  { path: "/anime", name: "anime", component: AnimePage },
  { path: "/profile", name: "profile", component: ProfilePage },
  { path: "/detail/:id", name: "detail", component: DetailPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
