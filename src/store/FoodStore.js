import {defineStore} from 'pinia'
export const usePeopleStore = defineStore('peoplestore', () => {
    state: () => {
    people: [{
        name:'',
        id:''
    }]    
    }
    }

)