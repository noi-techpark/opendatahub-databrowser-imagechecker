import {defineStore} from "pinia"
import axios from "axios"

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

export const useSearchStore = defineStore("search" , {

    state: () => {
        return {
            searchValue: "",
            results: [] as any[],
            loading: false
        }
    },
    actions: {
        print(){
            console.log(this.searchValue)
        },
        async search(){
            this.loading = true
            try {           //TODO this call is temporary and needs to be adjusted
                const response = await axios.get("https://tourism.api.opendatahub.testingmachine.eu/v1/Accommodation", {
                params: {
                    pagenumber: 1,
                    pagesize: 25,
                    roominfo: "1-18,18",
                    bokfilter: "hgv",
                    msssource: "sinfo",
                    availabilitychecklanguage: "en",
                    detail: 0,
                    searchfilter: this.searchValue,
                    removenullvalues: false,
                    getasidarray: false,
                }
                });
                this.results = response.data;
            } catch (error) {
                console.error("error in the request: ", error);
            } finally {
                this.loading = false;
            }
        }
    },
    getters: {
        
    }
    

})