<template>
  <section class="catalog-app page-layout">
    <section class="modal-prodacts">
      <toy-filter @setFilter="setFilter" />
      <toy-list :toys="toys" />
    </section>
  </section>
</template>

<script>
import toyList from "../components/toy-list.vue";
import toyFilter from "../components/toy-filter.vue";
export default {
  name: "catalog-app",
  created() {
    this.$store.dispatch({ type: "loadProducts" });
  },
  computed: {
    toys() {
      return this.$store.getters.toysToShow;
    },
  },
  methods: {
    setFilter(filterBy) {
      const copyfilter = JSON.parse(JSON.stringify(filterBy));
      this.$store.dispatch({ type: "setFilter", filterBy: copyfilter });
    },
  },
  components: {
    toyList,
    toyFilter,
  },
};
</script>

<style></style>
