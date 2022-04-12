<template>
  <section v-if="productToEdit" class="product-edit py-2">
    <h1 class="py-2">{{ pageTitle }}</h1>
    <form @submit.prevent="saveProduct" class="form">
      <div class="form-control">
        <label for="name" class="form-label">Name</label>
        <input id="name" type="text" class="form-input" v-model="productToEdit.name" />
      </div>
      <div class="form-control">
        <label for="price" class="form-label">Price</label>
        <input id="price" type="text" class="form-input" v-model.number="productToEdit.price" />
      </div>
      <div class="form-control flex flex-col">
        <label for="labels" class="form-label">Labels</label>

        <el-select multiple v-model="productToEdit.labels" collapse-tags-tooltip id="labels" size="large">
          <el-option v-for="label in labels" :key="label" :value="label" :label="label" />
        </el-select>
      </div>
      <div class="form-control flex flex-col">
        <label for="stock" class="form-label">In Stock</label>
        <input id="stock" type="checkbox" v-model="productToEdit.inStock" />
      </div>
      <div class="btn-group">
        <button type="submit" class="btn btn-success">save</button>
        <button @click="$router.push('/product')" class="btn btn-danger-text">go back</button>
      </div>
    </form>
  </section>
</template>

<script>
import { productService } from '../services/product-service'
export default {
  name: 'product-edit',
  data() {
    return {
      productToEdit: null,
      pageTitle: 'Add Product',
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      productService.getById(id).then((product) => (this.productToEdit = product))
      this.pageTitle = 'Edit Product'
    } else {
      productService.getEmptyProduct().then((product) => (this.productToEdit = product))
      this.pageTitle = 'Add Product'
    }
  },
  computed: {
    labels() {
      return this.$store.getters.labels
    },
  },
  methods: {
    saveProduct() {
      this.$store.dispatch({ type: 'saveProduct', product: this.productToEdit }).then(() => {
        this.$router.push('/product')
      })
    },
  },
}
</script>

<style></style>
