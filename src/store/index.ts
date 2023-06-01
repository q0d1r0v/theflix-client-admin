// imports
import {defineStore} from 'pinia'

export const useStore = defineStore('index', {
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++
        },
        decrement() {
            this.count--
        }
    }
})