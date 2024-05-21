<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';
import { usePeopleStore } from '/src/stores/PeopleStore';
import { useProductStore } from '/src/stores/ProductStore';

const productStore = useProductStore();
const peopleStore = usePeopleStore();
const router = useRouter();

const foodname = ref('');
const foodcost = ref('');
const payerPerson = ref(null);
const valid = ref(true);

const addProduct = () => {
    if (valid.value && foodname.value.length > 0 && payerPerson.value) {
        const newProduct = {
            id: uuidv4(),
            foodname: foodname.value,
            foodcost: foodcost.value,
            payerPerson: payerPerson.value,
            eatBy: [], 
            peopleSelection: Object.fromEntries(peopleStore.people.map(person => [person.id, false])),
            show: false
        };

        productStore.addProduct(newProduct);

        for (const personId in newProduct.peopleSelection) {
            if (newProduct.peopleSelection[personId]) {
                handleSelectionChange(newProduct.id, personId, true);
            }
        }

        foodname.value = '';
        foodcost.value = '';
        payerPerson.value = null;
    }
}

const removeProduct = (index) => {
    productStore.removeProduct(index);
}

const handleSelectionChange = (productId, personId, isSelected) => {
    productStore.getProduct(productId).peopleSelection[personId] = isSelected;
    console.log(productStore.products)
}

const toggle = () => {
    if (productStore.products.length >= 1) {
        router.push({ name: 'result' });
    } else {
        alert("Добавьте хотя бы одну позицию");
    }
}
</script>

<template>
    <v-form v-model="valid" class="d-flex flex-column">
        <v-container>
            <v-text-field v-model="foodname" label="Введите название"></v-text-field>
            <v-text-field v-model="foodcost" label="Введите цену" type="Number"></v-text-field>
            <v-select v-model="payerPerson" :items="peopleStore.people.map(person => person.name)" item-value="id" item-text="person.name" chips label="Кто платил?"></v-select>
            <v-btn class="mt-3" @click="addProduct(foodname,foodcost,payerPerson)">Добавить</v-btn>
        </v-container>

        <div v-for="(product, index) in productStore.products" :key="product.id">
            <v-card border-color="white" color="white" rounded solo flat class="d-flex flex-column align-items-center mt-5">
                {{ product.foodname }} {{ product.foodcost }} {{ product.payerPerson }}
                <v-btn :icon="product.show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="product.show = !product.show"></v-btn>
                <div v-if="product.show">
                    <v-divider></v-divider>
                    <div v-for="person in peopleStore.people" :key="person.id">
                        <v-checkbox class="d-flex flex-row" :label="person.name" v-model="product.peopleSelection[person.id]" @change="handleSelectionChange(product.id, person.id, product.peopleSelection[person.id])"></v-checkbox>
                    </div>
                </div>
                <v-btn @click="removeProduct(index)" append-icon="mdi-close"></v-btn>
            </v-card>
        </div>
    </v-form>

    <v-btn @click="toggle" class="mt-5">Итог</v-btn>
</template>
