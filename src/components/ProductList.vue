<script setup>
  import { ref } from "vue";
  import { v4 as uuidv4 } from 'uuid';
  import { useRouter } from 'vue-router';
  import { usePeopleStore } from '/src/stores/PeopleStore';
  import { useProductStore } from '/src/stores/ProductStore';


  const productStore = useProductStore();
  const peopleStore = usePeopleStore();
  const router = useRouter();
  const foodname = ref('')
  const foodcost = ref ('')
  const selectedPerson = ref(null);
  const valid = ref(true);

  const addProduct = () => {
    if (valid.value && foodname.value.length > 0 && selectedPerson.value) {
      const newProduct =  {
        id: uuidv4(),
        foodname: foodname.value,
        foodcost: foodcost.value,
        selectedperson: selectedPerson.value
        };
        productStore.addProduct(newProduct);
        foodname.value = '';
        foodcost.value = '';
        selectedPerson.value = null;
        console.log(productStore.products)
    }
  }

  const removeProduct = (index) => {
    productStore.removeProduct(index);
  }

const toogle = () => {
  if (productStore.products.length >= 1) {
    router.push({ name: 'result' }); }
  else {
    alert ("Добавьте хотя бы одну позицию");
    console.log(productStore.products)
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
    <v-select
      v-model="selectedPerson"
      :items="peopleStore.people.map(person => person.name)"
      item-value="id"
      item-text="person.name"
      chips
      label="Кто платил?">
    </v-select>
      <v-btn class="mt-3"
      @click="addProduct(foodname,foodcost,selectedPerson)">Добавить </v-btn>
    </v-container>
    <div v-for="(product, index) in productStore.products" :key="product.id">
      <v-card
      border-color="white"
      color="white"
      rounded solo flat
      class="d-flex flex-column align-items-center mt-5">
        {{ product.foodname }} {{ product.foodcost }} {{ product.selectedperson }}
          <v-btn
          @click="removeProduct(index)"
          append-icon="mdi-close">
          </v-btn>
      </v-card>
    </div>
  </v-form>
  <v-btn @click="toogle" class="mt-5">Итог</v-btn>
</template>
