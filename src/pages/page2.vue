<script setup>
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';
import { usePeopleStore } from '/src/stores/PeopleStore';

const router = useRouter();
const peopleStore = usePeopleStore();
const firstname = ref('');
const valid = ref(true);
const nameRules = ref([
  (v) => !!v || 'Name is required'
]);

const addUser = () => {
  if (valid.value) {
    const newPerson = { id: uuidv4(), name: firstname.value };
    peopleStore.addPerson(newPerson);
    firstname.value = '';
  }
}

const removeUser = (index) => {
  peopleStore.removePerson(index);
}

const toogle = () => {
  router.push({ name: 'addchecks' });
};
</script>

<template>
  <v-card class="d-flex flex-column align-center justify-center" width="500px" height="600px" border-radius="40px" background-color="white">
    <h2>Add person</h2>
    <v-form v-model="valid">
      <v-container>
        <v-text-field v-model="firstname" :rules="nameRules" label="Enter Name"></v-text-field>
        <v-btn class="mt-5" @click="addUser">Add User</v-btn>
      </v-container>
    </v-form>
    <v-divider class="mt-5"></v-divider>
    <v-container>
      <v-list>
        <v-list-item v-for="(person, index) in peopleStore.people" :key="person.id">
          <v-list-item-content>{{ person.name }}</v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="removeUser(index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
    <v-divider class="mt-5"></v-divider>
    <v-btn @click="toogle">Continue</v-btn>
  </v-card>
</template>
