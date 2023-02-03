import Vue from "vue";
import Antd from "ant-design-vue";
import "./theme/index.less";
import App from "./App.vue";
import { initRouter } from "./router";
import Viser from "viser-vue";
import store from "./store";
import "animate.css/source/animate.css";
import Plugins from "@/plugins";
import MyIconComponent from "@/icons";
import { initI18n } from "@/utils/i18n";
import bootstrap from "@/bootstrap";
import "moment/locale/zh-cn";
import { FormModel } from "ant-design-vue";
Vue.use(FormModel);
Vue.component("my-icon", MyIconComponent);
const router = initRouter(store.state.setting.asyncRoutes);
const i18n = initI18n("CN");

Vue.use(Antd);
Vue.config.productionTip = false;
Vue.use(Viser);
Vue.use(Plugins);

bootstrap({ router, store, i18n, message: Vue.prototype.$message });

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
