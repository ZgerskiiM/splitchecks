<template>
  <v-card
  class="d-flex
  flex-column
  align-center
  justify-start pt-1"
  width="62.5em"
  min-height="40em">
  <v-card-title><h2>Результаты</h2>
  </v-card-title>
  <v-divider></v-divider>
    <v-container>
      <v-list v-for="(debtor) in arrDebtors" :key="debtor.id">
        <v-list-item v-if="debtor.debt.price>0"><strong>{{ debtor.name }}</strong> должен(на) <strong>{{ debtor.debt.name }}</strong> {{ debtor.debt.price }}</v-list-item>
        <v-list-item v-else-if="debtor.debt.price<=0"><strong>{{ debtor.name }}</strong> Никому не должен(на)</v-list-item>
      </v-list>
    </v-container>
  </v-card>
  <v-card class="d-flex justify-center align-center mt-2" height="4em">
    <v-btn @click="toggle" width="50em">На главную</v-btn>
  </v-card>
</template>

<script setup>
import { useProductStore } from '/src/stores/ProductStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const arrDebtors = ref([]);

function calculateDebts() {
const expenses = [];

productStore.products.forEach(product => {
  product.eatBy.forEach(person => {
    if (person.name !== product.payerPerson) {
      const costPerPerson = product.foodcost / product.eatBy.length;
      const index = expenses.findIndex(exp => exp.name === person.name && exp.debt.name === product.payerPerson);

      if (index >= 0) {
        expenses[index].debt.price += costPerPerson;
        } else {
        expenses.push({
          id: expenses.length + 1,
          name: person.name,
          debt: {
            name: product.payerPerson,
            price: costPerPerson
          }
        });
      }
    }
  });
});

expenses.forEach(exp => {
const opposite = expenses.find(e => e.name === exp.debt.name && e.debt.name === exp.name);
if (opposite && exp.debt.price > 0 && opposite.debt.price > 0) {
  const minPrice = Math.min(exp.debt.price, opposite.debt.price);
  exp.debt.price -= minPrice;
  opposite.debt.price -= minPrice;
}
});

arrDebtors.value = expenses.filter(exp => exp.debt.price > 0);
}

calculateDebts();

const toggle = () => {
  const router = useRouter();
  router.push({ name: 'Home' });
};
</script>

<style scoped lang="scss">
.v-btn {
    border-radius: 1em
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
    font-size:20px;
}

.v-checkbox {
    border: 0.0625em solid white;
    border-radius: 1em;
}

</style>
