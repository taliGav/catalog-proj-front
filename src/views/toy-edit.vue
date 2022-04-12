<template>
  <section v-if="toyToEdit" class="toy-edit py-2">
    <h1 class="py-2">{{ pageTitle }}</h1>
    <form @submit.prevent="saveToy" class="form">
      <div class="form-control">
        <label for="name" class="form-label">Name</label>
        <input id="name" type="text" class="form-input" v-model="toyToEdit.name" />
      </div>
      <div class="form-control">
        <label for="price" class="form-label">Price</label>
        <input id="price" type="text" class="form-input" v-model.number="toyToEdit.price" />
      </div>
      <div class="form-control flex flex-col">
        <label for="labels" class="form-label">Labels</label>

        <el-select
          multiple
          v-model="toyToEdit.labels"
          collapse-tags-tooltip
          id="labels"
          size="large"
        >
          <el-option v-for="label in labels" :key="label" :value="label" :label="label" />
        </el-select>
      </div>
      <div class="form-control flex flex-col">
        <label for="stock" class="form-label">In Stock</label>
        <input id="stock" type="checkbox" v-model="toyToEdit.inStock" />
      </div>
      <div class="btn-group">
        <button type="submit" class="btn btn-success">save</button>
        <button @click="$router.push('/toy')" class="btn btn-danger-text">go back</button>
      </div>
    </form>
  </section>
</template>

<script>
import { toyService } from '../services/toy-service'
export default {
  name: 'toy-edit',
  data() {
    return {
      toyToEdit: null,
      pageTitle: 'Add Toy',
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      toyService.getById(id).then((toy) => (this.toyToEdit = toy))
      this.pageTitle = 'Edit Toy'
    } else {
      toyService.getEmptyToy().then((toy) => (this.toyToEdit = toy))
      this.pageTitle = 'Add Toy'
    }
  },
  computed: {
    labels() {
      return this.$store.getters.labels
    },
  },
  methods: {
    saveToy() {
      this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit }).then(() => {
        this.$router.push('/toy')
      })
    },
  },
}
</script>

<style></style>
