import { defineStore } from 'pinia';

export const useProductStore = defineStore( 'products',{
state: () => ({
    products: []
}),
actions: {
    addProduct(product) {
      this.products.push(product);
    },
    removeProduct(index) {
        this.products.splice(index, 1);
    }
}
});
