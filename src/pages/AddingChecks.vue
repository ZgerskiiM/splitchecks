<script setup>
import { ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import { usePeopleStore } from "/src/stores/PeopleStore";
import { useProductStore } from "/src/stores/ProductStore";

const productStore = useProductStore();
const peopleStore = usePeopleStore();
const router = useRouter();
const foodname = ref("");
const foodcost = ref("");
const payerPerson = ref(null);
const valid = ref(true);
const peopleSelection = ref({});

const rules = {
  required: value => !!value || 'Обязательное поле',
  number: value => !isNaN(parseFloat(value)) && isFinite(value) || 'Должно быть числом',
  positive: value => parseFloat(value) > 0 || 'Должно быть положительным числом'
};


const peopleList = computed(() => {
  return peopleStore.people.map(person => ({
    value: person.id,
    title: person.name
  }));
});

const isFormValid = computed(() => {
  return foodname.value.length > 0 &&
    rules.number(foodcost.value) === true &&
    rules.positive(foodcost.value) === true &&
    payerPerson.value !== null &&
    Object.values(peopleSelection.value).some(v => v);
});

const addProduct = () => {
  if (isFormValid.value) {
    const payer = peopleStore.people.find(person => person.id === payerPerson.value);
    const newProduct = {
      id: uuidv4(),
      foodname: foodname.value,
      foodcost: parseFloat(foodcost.value),
      payerPerson: payer ? payer.name : '',
      eatBy: peopleStore.people.filter(person => peopleSelection.value[person.id]),
      show: false,
    };
    productStore.addProduct(newProduct);
    foodname.value = "";
    foodcost.value = "";
    payerPerson.value = null;
    peopleSelection.value = {};
  }
}

const removeProduct = (index) => {
  productStore.removeProduct(index);
};

const toggle = () => {
  if (productStore.products.length >= 1 && productStore.products.some((product) => product.eatBy.length > 0)) {
    router.push({ name: "result" });
  } else {
    alert("Добавьте хотя бы одну позицию, где кто-то ел");
  }
};
</script>

<template>
  <v-card class="d-flex flex-column align-center justify-center pt-1" width="62.5em">
    <h2>Добавьте продукты</h2>
    <v-form v-model="valid">
      <v-container class="d-flex flex-column justify-center align-center">
        <v-text-field v-model="foodname" label="Название продукта" :rules="[rules.required]"></v-text-field>
        <v-text-field v-model="foodcost" label="Цена" type="number" :rules="[rules.required, rules.number, rules.positive]"></v-text-field>
        <v-select
    v-model="payerPerson"
    :items="peopleList"
    item-title="title"
    item-value="value"
    label="Кто платил?"
    :rules="[rules.required]"
  ></v-select>        <v-container>
          <p>Кто ел?</p>
          <v-checkbox v-for="person in peopleStore.people" :key="person.id" :label="person.name" v-model="peopleSelection[person.id]"></v-checkbox>
        </v-container>
        <v-btn class="mt-3" @click="addProduct" :disabled="!isFormValid">Добавить</v-btn>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-list class="d-flex flex-column align-start">
          <v-list-item v-for="(product, index) in productStore.products" :key="product.id">
            <v-card>
              <v-list-item class="d-flex flex-column justify-start align-start ma-5">
                  <v-list-item-action class="mr-5 pb-5 pl-4">
                    <v-btn icon="mdi-close" @click="removeProduct(index)"></v-btn>
                  </v-list-item-action>
                  <div>
                    <p>Название продукта:</p>
                    <v-text-field variant="solo" readonly :value="product.foodname"></v-text-field>
                  </div>
                  <div>
                    <p>Цена:</p>
                    <v-text-field variant="solo" readonly :value="product.foodcost"></v-text-field>
                  </div>
                  <div>
                    <p>Кто заплатил:</p>
                    <v-text-field variant="solo" readonly :value="product.payerPerson"></v-text-field>
                  </div>
                    <p>Кто ел:</p>
                    <v-text-field v-for="person in product.eatBy" :key="person.id" variant="solo" readonly>
                      {{ person.name }}
                    </v-text-field>
                  </v-list-item>
            </v-card>
          </v-list-item>

        </v-list>
      </v-container>
    </v-form>
  </v-card>
  <v-card class="d-flex justify-center align-center mt-2" height="4em">
    <v-btn @click="toggle" width="50em">Результаты</v-btn>
  </v-card>
</template>

<style scoped lang="scss">
.v-btn {
  border-radius: 1em;
}

.v-text-field {
  width: 12em;
}

.v-card {
  border-radius: 1em;
}

.v-list-item {
  .v-card {
    border-radius: 0em;
  }

  .v-btn {
    border-radius: 10em;
  }
}

.v-checkbox {
  border: 0.0625em solid white;
  border-radius: 1em;
}
</style>
