import AuthorityPlugin from "./authority-plugin";
import VueI18nPlugin from "./i18n-extend";
const Plugins = {
  install: function(Vue) {
    Vue.use(VueI18nPlugin);
    Vue.use(AuthorityPlugin);
  }
};
export default Plugins;
