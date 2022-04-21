import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// import gAuthPlugin from "vue3-google-oauth2";

// let gauthClientId =
//   "487280004063-ue4up9eg6u5lr3h4sg60du67irck8hnn.apps.googleusercontent.com";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(router);
app.use(pinia);

// app.use(gAuthPlugin, {
//   clientId: gauthClientId,
//   scope: "email",
//   prompt: "consent",
// });

app.mount("#app");
