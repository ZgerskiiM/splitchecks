import { defineStore } from 'pinia';

export const useProductsStore = defineStore({
id: 'products',
state: () => ({
    products: []
}),
actions: {
    addProduct(product) {
    this.product.push(product);
    }
}
});
