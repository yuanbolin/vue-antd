import storage from 'store'
export default {
  namespaced: true,
  state: {
    user: undefined,
    routesConfig: null
  },
  getters: {
    user: state => {
      if (!state.user) {
        try {
          const user = storage.get(process.env.VUE_APP_USER_KEY)
          state.user = user && JSON.parse(user)
        } catch (e) {
          console.error(e)
        }
      }
      return state.user
    },
    routesConfig: state => {
      if (!state.routesConfig) {
        try {
          const routesConfig = storage.get(process.env.VUE_APP_USER_ROUTES_KEY)
          state.routesConfig = routesConfig && JSON.parse(routesConfig)
          state.routesConfig = state.routesConfig ? state.routesConfig : []
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.routesConfig
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      storage.set(process.env.VUE_APP_USER_KEY, JSON.stringify(user))
    },
    setRoutesConfig(state, routesConfig) {
      state.routesConfig = routesConfig
      storage.set(process.env.VUE_APP_USER_ROUTES_KEY, JSON.stringify(routesConfig))
    }
  }
}
