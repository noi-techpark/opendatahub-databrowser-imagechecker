import {defineStore} from "pinia"
import axios from "axios"
import { useRoute, useRouter } from "vue-router"


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


//store to share the search value and results across components
export const useSearchStore = defineStore("search" , {

    state: () => {
        return {
            searchValue: "",
            results: [] as any[],
            loading: false
        }
    },
    actions: {
      
        async search( router: ReturnType<typeof useRouter>, route: ReturnType<typeof useRoute>){
            
            
                // Keep URL query updated
            const newQuery = { ...route.query }
            if (this.searchValue) {
                newQuery.searchfilter = this.searchValue
            } else {
                delete newQuery.search
            }

            router.replace({ query: newQuery })


            this.loading = true
            try {           //TODO Default call: this call is temporary and needs to be adjusted
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
        },
        restoreFromUrl() {
            const route = useRoute()
            if (route.query.search) {
                this.searchValue = String(route.query.search)
            }
        }
        
    },
    getters: {
        
    }
    

})




//store for the filter functionality
interface Filter {
    type: string;
    comparison: string;
    value: string;
}

export const useFilterStore = defineStore("filter", {

    
    state: () => {
        const languageStore = useLanguageStore()
        return {
                filters: [
                    {
                        type: `AccoDetail.${languageStore.language.toLowerCase()}.Name`,
                        comparison: "like",
                        value: "",
                    } as Filter,
                ],
    loading: false,
    showFilterSideBar: false,
        }
    },
    actions: {
        async applyFilters( ) {

            const searchStore = useSearchStore();
            this.loading = true;
            try {
                
                const conditions = this.filters.map(f => `like(${f.type},'${f.value}')`);
                const rawfilter = `and(${conditions.join(',')})`;
                console.log(searchStore.searchValue)    //DEBUG
                console.log("Raw filter:", rawfilter);


                const response = await axios.get("https://tourism.api.opendatahub.testingmachine.eu/v1/Accommodation", { 
                    params: {
                        pagenumber: 1,
                        pagesize: 25,
                        roominfo: "1-18,18",
                        bokfilter: "hgv",
                        msssource: "sinfo",
                        availabilitychecklanguage: "en",
                        detail: 0,
                        searchfilter: searchStore.searchValue,
                        rawfilter: rawfilter,
                        removenullvalues: false,
                        getasidarray: false,
                    }
                 });
                return response.data;
                

            } catch (error) {
                console.error("Error applying filters:", error);
            } finally {
                this.loading = false;
               
            }
        },

        addFilter() {
        const languageStore = useLanguageStore()
        this.filters.push({
            type: `AccoDetail.${languageStore.language.toLowerCase()}.Name`,
            comparison: "like",
            value: "",
        });
        },

        removeFilter(index: number) {
        this.filters.splice(index, 1);
        },

        updateFilter(index: number, field: keyof Filter, value: string) {
        this.filters[index][field] = value;
        },

        

  },
})