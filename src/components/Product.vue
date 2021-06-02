<template>
<div class="overflow-hidden rounded-2xl h-90 m-auto lg:w-1/4 md:w-1/2 p-4 w-full product-card scale-on-hover">
    <img loading="lazy" :alt="product.name" :src="product.image_src" class="rounded-t-lg object-cover object-center w-full h-full block"/>
    <div class="bg-white w-full p-4 relative rounded-b-lg">
        <button aria-label="Edit product details" type="button" class="absolute rounded-full bg-indigo-500 text-white w-10 h-10 right-2 -top-6 sm:hidden">
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
