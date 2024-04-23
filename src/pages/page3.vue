<script setup>
  import { ref } from "vue";
  import { v4 as uuidv4 } from 'uuid'; 

  const dialog = ref(true);
  const products = ref([
    { id: uuidv4(), foodname: "", cost: "" } 
  ]);


  function addProduct(productName) {
    products.value.push({ id: uuidv4(), foodname: productName, cost: '' });
  }


  function removeFood(index) {
    products.value.splice(index, 1);
  }
</script>

<template>
  <v-card class="d-flex flex-column align-center justify-center" width="500px" height="600px" border-radius="40px" background-color="white">
    <h2>Add product</h2>
    <v-form v-model="valid">
      <v-container>
        <v-text-field v-model="foodname" label="Enter position"></v-text-field>
        <v-btn class="mt-3" @click="addProduct(foodname), foodname = ''">Add product</v-btn>
      </v-container>
      <div v-for="(product, i) in products" :key="product.id">
        <v-card border-color="white" color="white" rounded solo flat class="d-flex flex-column align-items-center mt-5">{{product.foodname}}
          <v-btn @click="removeFood(i)" append-icon="mdi-close"></v-btn>
        </v-card>
      </div>
      <v-card>
        
      </v-card>
    </v-form>
    <v-btn @click="dialog = false" class="mt-5">Close</v-btn>
    <v-btn class="mt-5">Continue</v-btn>
  </v-card>
</template>

<style scoped>
</style>