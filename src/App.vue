<template>
<section id="app" class="text-gray-600 body-font h-screen">
  <EditProduct
    :showModal="showModal"
    :actionType="actionType"
    :product="selectedProductToEdit"
    @close-modal="showModal=false"
    @saved-edit="saveEdit"
    @add-product="saveNewProduct"
  />

  <!-- the search bar -->
  <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
    <div class="md:flex">
      <div class="w-full p-3 mt-3">
          <div class="relative space-x-4">
            <input @input="debounceSearch" type="text" class="bg-gray-50 border-2 h-14 w-full px-6 rounded-lg focus:outline-none hover:cursor-pointer" placeholder="Search by name or price...">
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
  <div v-if="typing" class="flex flex-col text-center h-screen w-full pt-6 sm:pt-10">
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-white">{{ this.typing }}</p>
  </div>
  <div v-else-if="origProducts.length <= 0" class="flex flex-col text-center h-screen w-full pt-6 sm:pt-10">
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-white">You have no products available.</p>
  </div>
  <div v-else-if="filteredProductsList.length > 0" class="container h-auto min-h-screen px-8 sm:px-10 pt-6 sm:pt-10 pb-10 mx-auto">
    <div class="flex flex-wrap -m-4">
      <Product
        v-for="(product, index) in filteredProductsList"
        :key="'product-' + index"
        :product="product"
        @edit-product="showEditProductModal(product, index)"
        @delete-product="triggerDeleteProduct(index, product)"
      />
    </div>
  </div>
  <div v-else class="flex flex-col text-center h-screen w-full pt-6 sm:pt-10">
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-white">Your search did not match any documents.</p>
  </div>

  <!-- the add button -->
  <button
    v-if="!typing"
    @click="showAddProductModal()"
    class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 sm:px-6 border-b-2 border-gray-700 hover:border-purple-500 rounded fixed right-2 sm:right-4 sm:bottom-10 bottom-5 z-10">
    Add
  </button>
</section>
</template>

<script>
import Product from './components/Product.vue'
import EditProduct from './components/EditProduct.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Product,
    EditProduct
  },
  data() {
    return {
      // for filtered list
      filteredProductsList: {},

      // for search bar
      typing: "",
      searchKey: "",

      // for add or edit popup
      actionType: "",
      showModal: false,

      // for edit
      selectedProductToEdit: {},
      indexOfEditedProduct: null
    };
  },
  created() {
    this.filteredProductsList = this.origProducts;
  },
  computed: mapState({
    origProducts: state => state.products.origProducts
  }),
  methods: {
    showEditProductModal(product, index){
      this.showModal = true;
      this.selectedProductToEdit = product;
      this.indexOfEditedProduct = index;
      this.actionType = 'edit';
    },

    showAddProductModal(){
      this.showModal = true;
      this.actionType = 'add';
    },

    saveNewProduct(newProduct){
      // reset data
      this.actionType = "";

      // add new product to products list
      this.$store.commit('addNewProductToOriginalList', newProduct);

      // initiate filter
      this.initiateRefilteringOfList(this.searchKey);
      this.showModal = false;

      // show save successful
      this.showNotif("success", "Successfully added a new product!");
    },

    saveEdit(newProduct){
      // reset data
      this.selectedProductToEdit = {};
      this.actionType = "";

      // set new value of product in filtered list
      this.filteredProductsList[this.indexOfEditedProduct] = {... newProduct};

      // update original list in vuex store
      this.$store.commit('saveEditedProductToOriginalList', newProduct);

      // initiate filter
      this.initiateRefilteringOfList(this.searchKey);
      this.showModal = false;

      // show save successful
      this.showNotif("success", "Changes to product details are saved!");
    },

    triggerDeleteProduct(indexInFilteredList, productToDelete){
      this.$toasted.show("Are you sure you want to delete this product?", { 
        theme: "toasted-primary", 
        position: "bottom-center",
        duration : null,
        className: "notif-alert",
        action : [
            {
                text : 'Cancel',
                onClick : (e, toastObject) => {
                    toastObject.goAway(0);
                }
            },
            {
                text : 'Continue',
                onClick: (e, toastObject) => {
                  this.deleteProduct(indexInFilteredList, productToDelete, toastObject);
                }
            }
        ]
      });
    },

    deleteProduct(indexInFilteredList, productToDelete, toastObject){
      // reset data
      this.actionType = "";

      // delete product in filtered list
      this.filteredProductsList.splice(indexInFilteredList, 1);

      // update original list in vuex store
      this.$store.commit('deleteProductFromOriginalList', productToDelete);

      // remove toast
      toastObject.goAway(0);
    },

    showNotif(notifType, messageText){
      this.$toasted.show(messageText, {
        theme: "bubble",
        position: "bottom-center",
        duration : 3000,
        type: notifType,
        className: "notif-alert"
      });
    },

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
      this.filteredProductsList = this.filterListBySearchKey(this.origProducts, searchKey);
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
        let keysToSkip = ['details', 'image_src', 'id'];

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
#app {
  background: linear-gradient(90deg, #000 21px, transparent 1%) center, linear-gradient(#000 21px, transparent 1%) center, #a799cc;
  background-size: 22px 22px;
  height: 100%;
}

.notif-alert{
  font-family: Arial, Helvetica, sans-serif;
  align-items: center;
}
</style>
