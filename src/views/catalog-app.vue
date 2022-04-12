<template>
  <section class="catalog-app page-layout">
    <section class="modal-prodacts">
      <product-filter @setFilter="setFilter" />
      <product-list :products="products" />
    </section>
  </section>
</template>

<script>
import productList from '../components/product-list.vue'
import productFilter from '../components/product-filter.vue'
export default {
  name: 'catalog-app',
  created() {
    this.$store.dispatch({ type: 'loadProducts' })
  },
  computed: {
    products() {
      return this.$store.getters.productsToShow
    },
  },
  methods: {
    setFilter(filterBy) {
      const copyfilter = JSON.parse(JSON.stringify(filterBy))
      this.$store.dispatch({ type: 'setFilter', filterBy: copyfilter })
    },
  },
  components: {
    productList,
    productFilter,
  },
}
</script>

<style></style>
