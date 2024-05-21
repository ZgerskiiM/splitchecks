<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';
import { usePeopleStore } from '/src/stores/PeopleStore';

const router = useRouter();
const peopleStore = usePeopleStore();
const firstname = ref('');
const valid = ref(true);


const addUser = () => {
  if (valid.value)
    if (firstname.value.length > 0) {
    const newPerson = { id: uuidv4(), name: firstname.value, selected: false };
    peopleStore.addPerson(newPerson);
    firstname.value = '';
  }
}

const removeUser = (index) => {
  peopleStore.removePerson(index);
}

const toogle = () => {
  if (peopleStore.people.length >= 2) {
    router.push({ name: 'addchecks' }); }
  else {
    alert ("Добавьте хотя бы двух пользователей");
  }
  }
</script>
<template>
    <v-card 
  class="d-flex 
  flex-column
  align-center 
  justify-start pt-1" 
  width="800px">
    <h2>Добавьте людей</h2>
        <v-form v-model="valid" @submit.prevent="">
      <v-container>
        <v-text-field
        v-model="firstname"
        label="Введите имя"></v-text-field>
        <v-btn  @click="addUser">Добавить</v-btn>
      </v-container>
    </v-form>
    <v-divider></v-divider>
    <v-container>
      <v-list class = "d-flex flex-column align-start ">
        <v-list-item v-for="(person, index) in peopleStore.people" :key="person.id">
          <v-card>
          <v-list-item-content class = "d-flex flex-row justify-start align-center mt-5 ">
            <v-list-item-action class = "mr-5 pb-5 pl-4">
            <v-btn icon = "mdi-close" @click="removeUser(index)">
            </v-btn>
          </v-list-item-action>
          <v-text-field
          readonly
          variant="solo">
            {{ person.name }}
          </v-text-field>
        </v-list-item-content>
        </v-card>
        </v-list-item>
      </v-list>
    </v-container>
    
   </v-card>
   <v-card class = "d-flex justify-center align-center mt-2"
   height = "4em">
    <v-btn  @click="toogle"
    width = "50em">Перейти к продуктам</v-btn>
    </v-card>
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