import { createStore } from 'vuex'
import productStore from './modules/product-store'
// import userStore from './modules/user-store'
// import reviewStore from './modules/review-store'

const store = createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    productStore,
  },
})

export default store
