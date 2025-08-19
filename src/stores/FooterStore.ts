import {defineStore} from "pinia"

//Store for the page selection
export const useFooterStore = defineStore("footer" , {

    state: () => {
        return {pagenumber: 1,
                pagesize: 25,
                TotalResults: 0,
                TotalPages: 0,
                CurrentPage: 0,
                PreviousPage: "",
                NextPage: "",
                FirstTotalResults: 0

        }
    },
    actions: {
        
    },
    getters: {
        
    }
    

})

