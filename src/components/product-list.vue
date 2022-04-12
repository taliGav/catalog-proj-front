<template>
  <button @click="$router.push('/product/edit')" class="btn btn-secondary">add a new product</button>
  <ul class="product-list py-1 clean-list grid gap-2">
    <product-preview v-for="product in products" :key="product._id" :product="product">
      <li @click="$router.push(`/product/${product._id}`)" class="product-preview p-2 flex flex-col gap-1">
        <div class="flex items-center justify-between gap-2">
          <h3 class="uppercase">{{ product.name }}</h3>
          <p class="clr-teal fw-bold">${{ product.price }}</p>
        </div>
        <div class="labels flex flex-wrap items-center gap-1">
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
