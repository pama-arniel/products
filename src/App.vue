<template>
<section id="app" class="text-gray-600 body-font bg-gray-200 h-screen">
  <!-- the search bar -->
  <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
    <div class="md:flex">
      <div class="w-full p-3 mt-8">
          <div class="relative space-x-4">
            <input @input="debounceSearch" type="text" class="bg-white h-14 w-full px-6 rounded-lg focus:outline-none hover:cursor-pointer" placeholder="Search by name or price...">
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
  <div v-if="typing" class="flex flex-col text-center w-full pt-6 sm:pt-10">
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">{{ this.typing }}</p>
  </div>
  <div v-else-if="filteredProductsList.length > 0" class="container px-5 sm:px-10 pt-6 sm:pt-10 pb-20 mx-auto">
    <div class="flex flex-wrap -m-4">
      <Product
        v-for="(product, index) in filteredProductsList"
        :key="'product-' + index"
        :product="product"
      />
    </div>
  </div>
  <div v-else class="flex flex-col text-center w-full pt-6 sm:pt-10">
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Your search did not match any documents.</p>
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
      },
      typing: "",
      searchKey: "",
      filteredProductsList: productsJSON.list
    };
  },
  methods: {
    debounceSearch(event) {
      let newSearchKey = event.target.value;
      this.typing = newSearchKey ? "Typing..." : "";
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.typing = "";
        this.searchKey = newSearchKey;

        // filter the new list
        this.initiateRefilteringOfList(newSearchKey);
      }, 600);
    },

    initiateRefilteringOfList(searchKey){
      this.filteredProductsList = this.filterListBySearchKey(productsJSON.list, searchKey);
    },

    filterListBySearchKey(origList, searchKey){
      if(!searchKey) return origList;

      return origList.filter((item) => {
        return this.isItemIncludedInFilter(item, searchKey);
      });
    },

    isItemIncludedInFilter(item, searchKey){
      if(!searchKey){
        return true;
      } else {
        let keysToSkip = ['details', 'image_src'];

        // iterate the key-value pairs of the item and
        // determine if the search term is found in one of them
        for (const [currKey, currValue] of Object.entries(item)) {
          // skip keys that should not be included in the search
          if(keysToSkip.includes(currKey)) continue;

          if(currValue){
            let completeValue = Array.isArray(currValue) ? currValue?.join(",") : currValue;
            let keyRegex = new RegExp(searchKey, "gi");

            // if found in array, break loop and return true
            if(completeValue.match(keyRegex)){
              return true;
            }
          }
        }

        return false;
      }
    },
  }
}
</script>

<style>

</style>
