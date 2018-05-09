export const menu = {

  namespaced: true,
  state: {
    menu: false
  },
  mutations: {
    menuToggle (state) {
      state.menu = !state.menu;
    }
  }
}
