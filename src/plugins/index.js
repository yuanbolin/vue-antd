import AuthorityPlugin from './authority-plugin'

const Plugins = {
  install: function (Vue) {
    Vue.use(AuthorityPlugin)
  }
}
export default Plugins
