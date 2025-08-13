import {defineStore} from "pinia"

//Store for the selected Language
export const useLanguageStore = defineStore("language" , {

    state: () => {
        return {language: "DE"}
    },
    actions: {
        print(){
            console.log(this.language)
        }
    },
    getters: {
        
    }
    

})

