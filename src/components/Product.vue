<template>
<div class="overflow-hidden rounded-2xl h-90 m-auto lg:w-1/4 md:w-1/2 p-4 w-full product-card scale-on-hover">
    <div class="relative">
      <img loading="lazy" :alt="product.name" :src="product.image_src" class="rounded-t-lg object-cover object-center w-full h-full block"/>
      <button @click="$emit('delete-product')" class="modal-close absolute top-0 right-0 align-middle cursor-pointer flex flex-col items-center mt-4 mr-4 text-white z-50 rounded-full bg-black opacity-50 p-2 sm:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </button>
    </div>
    <div class="bg-white w-full p-4 relative rounded-b-lg">
        <button @click="$emit('edit-product')" aria-label="Edit product details" type="button" class="absolute rounded-full bg-indigo-500 text-white w-10 h-10 right-2 -top-6 sm:hidden">
          <svg width="6" height="6" fill="currentColor" class="h-5 w-5 text-white mx-auto" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
            </path>
          </svg>
        </button>
        <div class="mt-4">
            <h2 class="text-gray-900 title-font text-lg font-medium">{{product.name}}</h2>
            <p class="mt-1"><span>$</span>{{ product.price }}</p>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true
    },
  },
}
</script>

<style scoped>
.product-card:hover button {
  display: block;
}

@media only screen and (min-width: 768px) {
  /* For desktop screens only  */
  .scale-on-hover:hover {
    -webkit-transform: scale(1.02);
    -ms-transform: scale(1.02);
    transform: scale(1.02);
  }
}
</style>
