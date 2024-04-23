<script setup>
  import { ref } from "vue";
  import { v4 as uuidv4 } from 'uuid'; 
  import {
    useRouter
  } from 'vue-router'
  const router = useRouter()
  const toogle = () => {
  console.log(router);
  router.push({name: 'addchecks'} );
};

  const dialog = ref(true);
  const users = ref([
    { id: uuidv4(), name: "" } 
  ]);


  function addUser(firstName) {
    users.value.push({ id: uuidv4(), name: firstName });
  }


  function removeUser(index) {
    users.value.splice(index, 1);
  }
</script>

<template>
  <v-card class="d-flex flex-column align-center justify-center" width="500px" height="600px" border-radius="40px" background-color="white">
    <h2>Add person</h2>
    <v-form v-model="valid">
      <v-container>
        <v-text-field v-model="firstname" :rules="nameRules" label="Enter Name"></v-text-field>
        <v-btn class="mt-5" @click="addUser(firstname), firstname = ''">Add User</v-btn>
      </v-container>
      <div v-for="(user, i) in users" :key="user.id">
        <v-card border-color="white" color="white" rounded solo flat class="d-flex flex-column align-items-center mt-5">{{user.name}}
          <v-btn @click="removeUser(i)" append-icon="mdi-close"></v-btn>
        </v-card>
      </div>
    </v-form>
    <v-btn @click="dialog = false" class="mt-5">Close</v-btn>
    <v-btn class="mt-5" @click="toogle">Continue</v-btn>
  </v-card>
</template>

<style scoped>
</style>