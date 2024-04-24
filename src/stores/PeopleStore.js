// stores/people.js
import { defineStore } from 'pinia';

export const usePeopleStore = defineStore('people', {
    state: () => ({
    people: []
    }),
    actions: {
    addPerson(person) {
        this.people.push(person);
    },
    removePerson(index) {
        this.people.splice(index, 1);
    }
  }
});
