import {defineStore} from "pinia"

export const useStore = defineStore("store" , {

    state: () => {
        return { count: 0}
    },
    actions: {
        increment(val = 1){
            this.count += val
        },
        async waitAndAdd(){
            setTimeout(() => {
                this.count++
            }, 2000)
        }
    },
    getters: {
        doubleCount: (state) => state.count*2 
    }
    

})