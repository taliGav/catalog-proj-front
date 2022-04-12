<template>
  <section class="product-filter">
    <form @submit.prevent="" v-if="isOpen">
      <div class="form-control">
        <el-input
          @input="setFilter"
          v-model="filterBy.name"
          id="name"
          class="w-50"
          size="large"
          placeholder="Search"
        />
      </div>

      <div class="form-control">
        <el-select
          @change="setFilter"
          v-model="filterBy.inStock"
          id="stock"
          size="large"
          placeholder="Age"
        >
          <el-option label="All" value="" />
          <el-option label="In Stock" value="true" />
          <el-option label="Not in stock" value="false" />
        </el-select>
      </div>

      <div class="form-control">
        <el-select
          placeholder="Budget"
          multiple
          @change="setFilter"
          v-model="filterBy.labels"
          collapse-tags
          collapse-tags-tooltip
          id="labels"
          size="large"
        >
          <el-option
            v-for="label in labels"
            :key="label"
            :label="label"
            :value="label"
          />
        </el-select>
      </div>

      <div class="form-control">
        <el-select
          placeholder="Age"
          @change="setFilter"
          v-model="filterBy.sortBy"
          id="sort"
          size="large"
        >
          <el-option label="Time" value="time" />
          <el-option label="Name" value="name" />
          <el-option label="Price" value="price" />
        </el-select>
      </div>
    </form>
  </section>
</template>

<script>
import { utilService } from "../services/util-service";

export default {
  name: "product-filter",
  data() {
    return {
      filterBy: {
        name: "",
        labels: [],
        inStock: "",
        sortBy: "",
      },
      isOpen: true,
    };
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter, 500);
  },
  computed: {
    labels() {
      return this.$store.getters.labels;
    },
  },
  methods: {
    setFilter() {
      this.$emit("set-filter", { ...this.filterBy });
    },
  },
};
</script>
