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
  const payerPerson = ref(null);
  const eatBy = ref([]);
  const valid = ref(true);


  const addProduct = () => {
    if (valid.value && foodname.value.length > 0 && payerPerson.value) {
      const newProduct =  {
        id: uuidv4(),
        foodname: foodname.value,
        foodcost: foodcost.value,
        payerPerson: payerPerson.value,
        eatBy: [],
        };
        productStore.addProduct(newProduct);
        foodname.value = '';
        foodcost.value = '';
        payerPerson.value = null;
        console.log(productStore.products)

    }
  }

  const removeProduct = (index) => {
    productStore.removeProduct(index);
  }

  const handleSelectionChange = (personId, isSelected) => {
    const person = peopleStore.people.find(p => p.id === personId);
    if (person) {
      person.selected = isSelected;
      if (person.selected = isSelected) {
        productStore.products.eatBy = person.selected
      }
    }
    console.log (peopleStore.people)
    console.log (productStore.products)
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
      label="Введите цену"
      type = "Number">
    </v-text-field>
    <v-select
      v-model="payerPerson"
      :items="peopleStore.people.map(person => person.name)"
      item-value="id"
      item-text="person.name"
      chips
      label="Кто платил?">
    </v-select>
      <v-btn class="mt-3"
      @click="addProduct(foodname,foodcost,payerPerson)">Добавить </v-btn>
    </v-container>
    <div v-for="(product, index) in productStore.products" :key="product.id">
      <v-card
      border-color="white"
      color="white"
      rounded solo flat
      class="d-flex flex-column align-items-center mt-5">
        {{ product.foodname }} {{ product.foodcost }} {{ product.payerPerson }}
        <div v-for="person in peopleStore.people" :key="person.id">
    <v-checkbox
      :label="person.name"
      v-model="person.selected"
      @change="handleSelectionChange(person.id, person.selected)">
    </v-checkbox>
        </div>
          <v-btn
          @click="removeProduct(index)"
          append-icon="mdi-close">
          </v-btn>
      </v-card>
    </div>
  </v-form>
  <v-btn @click="toogle" class=" mt-5">Итог</v-btn>
</template>
