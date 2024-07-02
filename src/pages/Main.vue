<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const toogle = () => {
  router.push({ name: 'addpeople' });
};
</script>

<template>
  <div class="d-flex justify-center flex-column">
    <h1 class="mb-10">Делим счет</h1>
    <h2>Это просто способ поделить счет в ресторане или других местах
      <div>
        <v-btn @click="toogle" class="mt-10">Начать</v-btn>
      </div>
    </h2>
  </div>
</template>

<style scoped>
.v-btn {
  border-radius: 1em;
  width: 6em
}
</style>
