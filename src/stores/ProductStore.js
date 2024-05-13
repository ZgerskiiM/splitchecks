import { defineStore } from 'pinia';

export const useProductStore = defineStore({
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
