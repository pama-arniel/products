import productsJSON from '../../assets/products_list.json'

const state = {
    origProducts: productsJSON.list, // for unfiltered list
    filteredProductsList: productsJSON.list // for displayed in search
};

const mutations = {
    updateOrigProducts(state, updatedProducts) {
        state.origProducts = updatedProducts;
    },

    updateFilteredProducts(state, updatedFilteredProducts) {
        state.filteredProductsList = updatedFilteredProducts;
    }
};

export default {
    state,
    mutations
}