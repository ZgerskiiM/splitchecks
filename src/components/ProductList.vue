<script setup>
  import { ref } from "vue";
  import { v4 as uuidv4 } from 'uuid';
  import { usePeopleStore } from '/src/stores/PeopleStore';
  import { useProductStore } from '/src/stores/ProductStore';


  const productStore = useProductStore();
  const peopleStore = usePeopleStore();
  const foodname = ref('')
  const foodcost = ref ('')
  const products = ref([
    {foodname: "", foodcost: "" }
  ]);


  function addProduct(productName,productCost) {
    products.value.push({ id: uuidv4(), foodname: productName, foodcost: productCost });
  }


  function removeProduct(index) {
    products.value.splice(index, 1);
  }


  function selectConsumer(productIndex, personId) {
  const product = products.value[productIndex];
  if (!product.consumers.includes(personId)) {
    product.consumers.push(personId);

  }
}
</script>
<template>
<v-form v-model="valid">
    <v-container>
      <v-text-field 
      v-model="foodname" 
      label="Введите название">
    </v-text-field>
      <v-text-field 
      v-model="foodcost" 
      label="Введите цену">
    </v-text-field>
      <v-btn class="mt-3" 
      @click="addProduct(foodname,foodcost), foodname = '',
      foodcost = ''">Добавить</v-btn>
    </v-container>
    <div v-for="(product, i) in products" :key="product.id">
      <v-card 
      border-color="white" 
      color="white" 
      rounded solo flat 
      class="d-flex flex-column align-items-center mt-5">
        {{product.foodname}} {{ product.foodcost }}
        <v-select :items="peopleStore.people.map(person => person.name)"
        item-value="id"
        item-text="name"
        v-model="product.consumers"
        multiple
        chips
        label="Кто ел?"
        @change="selectConsumer(i, $event)"
      ></v-select>
        <v-btn
        background-color ="" 
        @click="removeProduct(i)" 
        append-icon="mdi-close">
        </v-btn>
      </v-card>
    </div>
  </v-form>
  <v-btn class="mt-5">Итог</v-btn>
</template>