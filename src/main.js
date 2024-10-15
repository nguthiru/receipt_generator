import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "vue-toastification";
import VueFeather from "vue-feather";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import "./assets/tailwind.css";

createApp(App)
  .use(store)
  .use(Toast, {})
  .use(router)
  .component(VueFeather.name, VueFeather)
  .mount("#app");
