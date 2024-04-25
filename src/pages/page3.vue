<script setup>
  import { ref } from "vue";
  import { v4 as uuidv4 } from 'uuid';
  import { usePeopleStore } from '/src/stores/PeopleStore';
  /**Не работает с пинией   import { useProducteStore } from '/src/stores/ProductStore';*/
  

  const productStore = useProductStore();
  const peopleStore = usePeopleStore();
  const foodname = ref('')
  const cost = ref ('')
  const products = ref([
    {foodname: "", cost: "" }
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
    <h2>Добавьте продукты</h2>
    <v-form v-model="valid">
      <v-container>
        <v-text-field v-model="foodname" label="Введите название"></v-text-field>
        <v-text-field v-model="foodname" label="Введите цену"></v-text-field>
        <v-btn class="mt-3" @click="addProduct(foodname), foodname = ''">Добавить</v-btn>
      </v-container>
      <div v-for="(product, i) in products" :key="product.id">
        <v-list-item v-for="(person, index) in peopleStore.people" :key="person.id">
          <v-list-item-content>{{ person.name }}</v-list-item-content>
        </v-list-item>
        <v-card border-color="white" color="white" rounded solo flat class="d-flex flex-column align-items-center mt-5">{{product.foodname}}
          <v-btn @click="removeFood(i)" append-icon="mdi-close"></v-btn>
        </v-card>
      </div>
      <v-card>

      </v-card>
    </v-form>
    <v-btn class="mt-5">Продолжить</v-btn>
  </v-card>
</template>

<style scoped>
</style>
