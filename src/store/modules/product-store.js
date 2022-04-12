import { productService } from '@/services/product-service.js'

export default {
  state: {
    products: [],
    filterBy: { name: '', inStock: '', labels: [], sortBy: '' },
    labels: productService.getLabels(),
  },
  getters: {
    products({ products }) {
      return products
    },
    productsToShow({ products, filterBy }) {
      const copyProducts = JSON.parse(JSON.stringify(products))
      return copyProducts
    },
    labels({ labels }) {
      return labels
    },
  },
  mutations: {
    setProducts(state, { products }) {
      state.products = products
    },
    saveProduct(state, { product }) {
      const idx = state.products.findIndex((t) => t._id === product._id)
      if (idx !== -1) state.products.splice(idx, 1, product)
      else state.products.push(product)
    },
    removeProduct(state, { productId }) {
      const idx = state.products.findIndex((t) => t._id === productId)
      state.products.splice(idx, 1)
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
    setSort(state, { sortBy }) {
      state.sortBy = sortBy
    },
  },
  actions: {
    loadProducts({ commit, state }) {
      productService.query(state.filterBy).then((products) => {
        commit({ type: 'setProducts', products })
      })
    },
    saveProduct({ commit }, { product }) {
      productService.save(product).then((savedProduct) => {
        commit({ type: 'saveProduct', product: savedProduct })
      })
    },
    removeProduct({ commit }, { productId }) {
      productService.remove(productId).then(() => {
        commit({ type: 'removeProduct', productId })
      })
    },
    setFilter({ dispatch, commit }, { filterBy }) {
      commit({ type: 'setFilter', filterBy })
      dispatch({ type: 'loadProducts' })
    },
  },
}
