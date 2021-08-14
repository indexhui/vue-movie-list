export default {
  namespaced: true,
  state: {
    token: "",
  },
  actions: {
    handSetToken(context, token) {
      context.commit("setToken", token);
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
};
