<template>
   <div class="body-font p-2">
      <div
         v-if="showModal && product"
         class="overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
         >
         <div class="relative w-auto m-3 w-2xl lg:w-7/12 max-h-screen overflow-y-auto">
            <!-- content -->
            <form @submit.prevent="saveChanges()" class="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-white">
               <!-- close 'x' button -->
               <div @click="toggleModal()" class="modal-close absolute top-0 right-0 align-middle cursor-pointer flex flex-col items-center mt-4 mr-4 text-black z-50">
                  <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                     <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
               </div>

               <!-- table -->
               <div class="bg-white shadow overflow-hidden rounded-lg">
                  <!-- image -->
                  <div class="flex flex-wrap justify-center">
                     <div class="w-auto m-4">
                        <img
                            loading="lazy" :src="shallowProductCopy.image_src" :alt="shallowProductCopy.name"
                            class="shadow rounded max-w-full h-auto align-middle border-none"
                        />
                     </div>
                  </div>
                  <!-- product details -->
                  <div class="border-t border-gray-200">
                     <dl>
                        <div
                           v-for="(value, keyName) in shallowProductCopy" :key="'product-key-' + keyName"
                        >
                           <div 
                              v-if="!keysToHide.includes(keyName)"
                              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                           >
                              <dt class="font-bold text-gray-900">
                                 <span>{{ formatKeyName(keyName) }}</span>
                              </dt>
                              <dd class="mt-1 text-gray-500 sm:mt-0 sm:col-span-2">
                                <input
                                    v-model="shallowProductCopy[keyName]" :type="getType(keyName)" required
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                              </dd>
                           </div>
                        </div>
                     </dl>
                  </div>
               </div>

               <!--footer-->
               <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    type="button" @click="toggleModal()"
                    class="text-red-500 bg-transparent hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="text-green-500 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Save Changes
                  </button>
               </div>
            </form>

         </div>
      </div>
      <div v-if="showModal" class="bg-black opacity-50 fixed inset-0 z-40"></div>
   </div>
</template>

<script>
export default {
  name: "EditProduct",
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    product: {
       type: Object,
       required: true,
       default: null
    }
  },
  watch: {
    product() {
        this.shallowProductCopy = Object.assign({}, this.product);
    }
  },
  data() {
    return {
       keysToHide: ['detail'],
       shallowProductCopy: {}
    };
  },
  methods: {
    saveChanges() {
        this.$emit('saved-edit', this.shallowProductCopy);
    },

    toggleModal() {
      this.$emit('close-modal');
    },

    formatKeyName(keyName) {
       if(keyName == 'name'){
          return '💼 Product Name:';
       } else if(keyName == 'price'){
          return '🌐 Price:';
       } else if(keyName == 'image_src'){
          return '⚙️ Image link:';
       } else if(keyName == 'detail'){
          return '🎨 Details:';
       }
       return keyName;
    },

    getType(keyName) {
       if(keyName == 'name'){
          return 'text';
       } else if(keyName == 'price'){
          return 'number';
       } else if(keyName == 'image_src'){
          return 'url';
       }
       return 'text';
    },
  }
}
</script>

<style scoped>
input {
    padding: 15px;
}
</style>