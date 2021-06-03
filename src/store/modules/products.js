import productsJSON from '../../assets/products_list.json'

const state = {
    origProducts: productsJSON.list, // for unfiltered list
};

const mutations = {
    updateOrigProducts(state, updatedProducts) {
        state.origProducts = updatedProducts;
    },

    addNewProductToOriginalList(state, newProduct){
        state.origProducts.push(newProduct);
    },

    saveEditedProductToOriginalList(state, updatedProduct){
      // find product index via product.id in orig products list
      let indexInOrigList = state.origProducts.findIndex(function(item){
        return item.id === updatedProduct.id
      });

      // if id index found, update product in original list
      if(indexInOrigList > -1){
        state.origProducts[indexInOrigList] = {... updatedProduct};
      }
    },

    deleteProductFromOriginalList(state, productToDelete){
        // find product index via product.id in orig products list
        let indexInOrigList = state.origProducts.findIndex(function(item){
            return item.id === productToDelete.id
        });

        // if id index found, update product in original list
        if(indexInOrigList > -1){
            state.origProducts.splice(indexInOrigList, 1);
        }
    }
};

export default {
    state,
    mutations
}