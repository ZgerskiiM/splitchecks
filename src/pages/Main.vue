<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const toogle = () => {
    console.log(router);
    router.push({name: 'addpeople'} );
  };
</script>

<template>
    <div class = "d-flex justify-center flex-column" >
      <h1 class = "mb-10">Split your checks</h1>
      <h2>It's easy way to split your checks in
      restaraunts and other places
      <div>
        <v-btn @click="toogle" class = "mt-10">Начать</v-btn>
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
