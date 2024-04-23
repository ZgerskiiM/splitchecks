<script setup>
  import {
    useRouter
  } from 'vue-router'
  const router = useRouter()
const toogle = () => {
  console.log(router);
  router.push({name: 'addpeople'} );
};
</script>
<template>
    <div class = "d-flex align-center flex-column mt-16 color black" ><h1>Split your checks</h1>
      <h2>It's easy way to split your checks in 
      restaraunts and other places
      <button @click="toogle">Начать</button>
    </h2>
    </div>

</template>



<style scoped>


</style>