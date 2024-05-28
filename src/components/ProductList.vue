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
const eatBy = ref([]);

const addProduct = () => {
    if (valid.value && foodname.value.length > 0 && payerPerson.value) {
        const newProduct = {
            id: uuidv4(),
            foodname: foodname.value,
            foodcost: parseFloat(foodcost.value),
            payerPerson: payerPerson.value,
            eatBy: [],
            peopleSelection: Object.fromEntries(peopleStore.people.map(person => [person.id, false])),
            cost: null,
            show: false
        };
        productStore.addProduct(newProduct);
        foodname.value = '';
        foodcost.value = '';
        payerPerson.value = null;
    }
};

const removeProduct = (index) => {
    productStore.removeProduct(index);

};

const handleSelectionChange = (productId, personId,isSelected) => {
    const product = productStore.getProduct(productId);
    product.peopleSelection[personId] = isSelected;

    if (isSelected) {
        if (!product.eatBy.includes(personId)) {
            product.eatBy.push(personId);
        }
    } else {
        const index = product.eatBy.indexOf(personId);
        if (index !== -1) {
            product.eatBy.splice(index, 1);
        }
    }
    console.log(product.eatBy)

}

const toggle = () => {
    if (productStore.products.length >= 1 && productStore.products.some(product => product.eatBy.length > 0)) {
        router.push({ name: 'result' });
    } else {
        alert("Добавьте хотя бы одну позицию, где кто-то ел");
    }
};
</script>

<template>
    <v-card
        class="d-flex flex-column align-center justify-center pt-1"
        width="62.5em">
        <h2>Добавьте продукты</h2>
        <v-form v-model="valid">
            <v-container class="d-flex flex-column justify-center align-center">
                <v-text-field v-model="foodname" label="Введите название"></v-text-field>
                <v-text-field v-model="foodcost" label="Введите цену" type="Number"></v-text-field>
                <v-select v-model="payerPerson"
                    :items="peopleStore.people.map(person => person.name)"
                    item-value="id"
                    item-text="person.name"
                    chips
                    label="Кто платил?">
                </v-select>
                <v-btn class="mt-3" @click="addProduct">Добавить</v-btn>
            </v-container>
            <v-divider></v-divider>
            <v-container>
                <v-list class="d-flex flex-column align-start ">
                    <v-list-item v-for="(product, index) in productStore.products" :key="product.id">
                        <v-card>
                            <v-list-item-content class="d-flex flex-column justify-start align-start ma-5 ">
                                <v-list-item-content class="d-flex flex-row justify-start align-center ml-5 ">
                                    <v-list-item-action class="mr-5 pb-5 pl-4">
                                        <v-btn icon="mdi-close" @click="removeProduct(index)">
                                        </v-btn>
                                    </v-list-item-action>
                                    <v-text-field
                                        variant="solo"
                                        readonly>
                                        {{ product.foodname }}</v-text-field>
                                    <v-text-field
                                        variant="solo"
                                        readonly>
                                        {{ product.foodcost }}
                                    </v-text-field>
                                    <v-text-field
                                        variant="solo"
                                        readonly>
                                        {{ product.payerPerson }}
                                    </v-text-field>
                                    <v-btn class="mb-5 ml-5"
                                        :icon="product.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                                        @click="product.show = !product.show">
                                    </v-btn>
                                </v-list-item-content>
                                <v-list class="d-flex flex-row justify-start" v-if="product.show">
                                    <v-list-item v-for="person in peopleStore.people" :key="person.id">
                                        <v-checkbox
                                            :label="person.name"
                                            v-model="product.peopleSelection[person.id]"
                                            @change="handleSelectionChange(product.id, person.id, product.peopleSelection[person.id])">
                                        </v-checkbox>
                                    </v-list-item>
                                </v-list>
                            </v-list-item-content>
                        </v-card>
                    </v-list-item>
                </v-list>
            </v-container>
        </v-form>
    </v-card>
    <v-card class="d-flex justify-center align-center mt-2"
        height="4em">
        <v-btn @click="toggle"
            width="50em">Результаты
        </v-btn>
    </v-card>
</template>

<style scoped lang="scss">
.v-btn {
    border-radius: 1em
}

.v-text-field {
    width: 12em
}

.v-card {
    border-radius: 1em
}

.v-list-item {
    .v-card {
        border-radius: 0em
    }
    .v-btn {
        border-radius: 10em
    }
}

.v-checkbox {
    border: 0.0625em solid white;
    border-radius: 1em;
}
</style>
