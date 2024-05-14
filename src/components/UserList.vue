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
    const newPerson = { id: uuidv4(), name: firstname.value, selected: false, eat: [] };
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
        <v-form v-model="valid" @submit.prevent="">
      <v-container>
        <v-text-field
        v-model="firstname"
        label="Введите имя"></v-text-field>
        <v-btn class="mt-5" @click="addUser">Добавить</v-btn>
      </v-container>
    </v-form>
    <v-container>
      <v-list class = "d-flex flex-row">
        <v-list-item v-for="(person, index) in peopleStore.people" :key="person.id">
          <v-list-item-content>{{ person.name }}
          <v-list-item-action>
            <v-btn icon @click="removeUser(index)">
            </v-btn>
          </v-list-item-action>
        </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
    <v-divider class="mt-5"></v-divider>
    <v-btn @click="toogle">Добавить людей</v-btn>
</template>

<style>
v-btn {
  background-color: rgb(0, 131, 246);
}
</style>