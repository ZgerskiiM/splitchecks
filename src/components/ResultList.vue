<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';
import { usePeopleStore } from '/src/stores/PeopleStore';
import { useProductStore } from '/src/stores/ProductStore';

const router = useRouter();
const peopleStore = usePeopleStore();
const productStore = useProductStore();
const firstname = ref('');
const valid = ref(true);

</script>

<template>
    <v-card
    class="d-flex
    flex-column
    align-center
    justify-center pt-1"></v-card>
    <h2>Результаты</h2>
    <v-btn @click ="FullCost" ></v-btn>
</template>

<style scoped lang="scss">
.v-btn {
    border-radius: 1em
}

  .v-text-field {
    width: 12em
  }

  .v-list-item-avatar {
    background-color: blue
  }

  .v-divider {
    width: 50em
  }

  .v-card {
    border-radius: 1em
  }

  .v-list-item {
    .v-card {
      border-radius:0em
    }
    .v-btn {
      border-radius:10em
    }
  }
</style>
