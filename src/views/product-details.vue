<template>
  <section v-if="product" class="product-detalis">
    <product-preview :product="product">
      <section class="py-3 flex flex-col gap-1">
        <div class="flex flex-col gap-1">
          <h3 class="uppercase">{{ product.name }}</h3>
          <p class="clr-teal fw-bold">Price: ${{ product.price }}</p>
          <p><span class="fw-bold">In Stock:</span> {{ product.inStock }}</p>
          <p><span class="fw-bold">Created At:</span> {{ $filters.formatTime(product.createdAt) }}</p>
        </div>
        <div class="labels flex flex-wrap items-center gap-1">
          <custom-label v-for="label in product.labels" :key="label" :label="label" />
        </div>
      </section>
    </product-preview>

    <h2 class="clr-teal">Reviews</h2>

    <form v-if="reviewToAdd && user" @submit.prevent="addReview" class="form">
      <div class="form-control my-1">
        <label for="txt" class="form-label fw-600">Your review</label>
        <textarea name="txt" id="txt" rows="3" class="form-input" v-model="reviewToAdd.content" required></textarea>
        <div class="form-control my-1">
          <label for="rate" class="form-label">Rate</label>
          <input id="rate" type="number" class="form-input" min="0" max="5" v-model.number="reviewToAdd.rate" />
        </div>
      </div>
      <button class="btn btn-info">Add Review</button>
    </form>

    <div v-if="reviews?.length" class="my-1 flex flex-col gap-1">
      <article class="review flex flex-col gap-1 items-start p-3" v-for="review in reviews" :key="review._id">
        <p class="fw-600">{{ review.content }}</p>
        <p>Rate: {{ review.rate }}⭐</p>
        <p>By: {{ review.user?.username }}</p>
        <button v-if="user?.isAdmin" class="btn btn-danger" @click="removeReview(review._id)">Delete review</button>
      </article>
    </div>
    <div class="p-2 flex flex-col gap-1" v-else>
      <h4>No reviews yet.</h4>
      <p>Be the first...</p>
    </div>

    <div v-if="user?.isAdmin" class="btn-group gap-1">
      <button @click="$router.push(`/product/edit/${product._id}`)" class="btn btn-primary">edit product</button>
      <button @click="removeProduct" class="btn btn-danger">delete product</button>
      <button @click="$router.push('/product')" class="btn btn-secondary">go back</button>
    </div>
  </section>
</template>

<script>
import { productService } from '../services/product-service'
// import { reviewService } from '../services/review-service'
import CustomLabel from '../components/custom-label.vue'
import productPreview from '../components/product-preview.vue'

export default {
  components: { productPreview, CustomLabel },
  name: 'product-details',
  data() {
    return {
      product: null,
      reviewToAdd: null,
    }
  },
  async created() {
    const { id } = this.$route.params
    this.product = await productService.getById(id)
    const user = this.$store.getters.user

    // review-store
    await this.$store.dispatch({ type: 'getReviews', filterBy: { productId: this.product._id } })

    if (user) {
      this.reviewToAdd = await reviewService.getEmptyReview()
      this.reviewToAdd.userId = user._id
      this.reviewToAdd.productId = this.product._id
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    reviews() {
      return this.$store.getters.reviews
    },
  },
  methods: {
    removeProduct() {
      this.$store.dispatch({ type: 'removeProduct', productId: this.product._id }).then(() => {
        this.$router.push('/product')
      })
    },
    async addReview() {
      if (!this.reviewToAdd.content) return
      await this.$store.dispatch({ type: 'addReview', review: this.reviewToAdd })
      await this.$store.dispatch({ type: 'getReviews', filterBy: { productId: this.product._id } })
    },
    async removeReview(reviewId) {
      await this.$store.dispatch({ type: 'removeReview', reviewId })
      await this.$store.dispatch({ type: 'getReviews', filterBy: { productId: this.product._id } })
    },
  },
}
</script>
