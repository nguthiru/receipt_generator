import { createStore } from "vuex";

export default createStore({
  state: {
    items: [],
    report_type: null
  },
  getters: {
    getTotalPrice(state) {
      return state.items.reduce((acc, item) => acc + item.total, 0);
    },
  },
  mutations: {
    addItem(state, item) {
      state.items.push(item);
    },
    removeItem(state, item) {
      state.items = state.items.filter((i) => i !== item);
    },
    setReportType(state,type){
      state.report_type = type
    }
  },
  actions: {},
  modules: {},
});
