<template>
  <section>
    <slot></slot>
  </section>
</template>

<script>
import customLabel from './custom-label.vue'

export default {
  name: 'product-preview',
  props: {
    product: Object,
  },
  components: {
    customLabel,
  },
}
</script>
