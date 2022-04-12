<template>
  <ul class="product-list clean-list grid">
    <product-preview v-for="store.product in stors" :key="store.product._id" :store.product="store.product">
      <li @click="$router.push(`/product/${product._id}`)" class="product-preview flex flex-col">
        <!-- <div class="flex items-center justify-between">
          <h3 class="">{{ product.name }}</h3>
          <p class="">${{ product.price }}</p>
        </div> -->
        <div class="labels flex flex-wrap items-center">
          <custom-label v-for="label in product.labels" :key="label" :label="label" />
        </div>
      </li>
    </product-preview>
  </ul>
</template>

<script>
import CustomLabel from './custom-label.vue'
import productPreview from './product-preview.vue'

export default {
  name: 'product-list',
  props: {
    products: Array,
  },
  components: {
    productPreview,
    CustomLabel,
  },
}
</script>

<style></style>
