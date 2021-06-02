<template>
<section id="app" class="text-gray-600 body-font bg-gray-200">
  <!-- the search bar -->
  <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
    <div class="md:flex">
      <div class="w-full p-3 mt-8">
          <div class="relative">
            <input type="text" class="bg-white h-14 w-full px-6 rounded-lg focus:outline-none hover:cursor-pointer" placeholder="Search anything...">
            <button class="outline-none focus:outline-none absolute top-4 right-5 border-l pl-4">
              <svg class="w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            
          </div>
      </div>
    </div>
  </div>

  <!-- the products grid -->
  <div class="container px-5 sm:px-10 pt-6 sm:pt-10 pb-20 mx-auto">
    <div class="flex flex-wrap -m-4">
      <Product
        v-for="(product, index) in products"
        :key="'product-' + index"
        :product="product"
      />
    </div>
  </div>
</section>
</template>

<script>
import productsJSON from './assets/products_list.json'

import Product from './components/Product.vue'

export default {
  name: 'App',
  components: {
    Product
  },
  data() {
    return {
      products: productsJSON.list,
      product: {
        name: "Geneva Project",
        price: 18.0,
        image_src: "https://dummyimage.com/420x260"
      }
    };
  },
}
</script>

<style>

</style>
