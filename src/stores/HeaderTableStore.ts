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



interface Filter {
    type: string;
    comparison: string;
    value: string;
}

const filterTypes: Record<string, string> = {
  "Shortname": "Title",
  "AccoTypeId": "Accomodation",
  "RegionId": "Region",
  "availabilitychecklanguage": "Languages",
  "x":"x",
  "y":"y"
}



export const useFilterStore = defineStore("filter", {

    
    state: () => {
        return {
                filters: [
                    {
                        type: "Shortname",
                        comparison: "like",
                        value: "",
                    } as Filter,
                ],
    loading: false,
    showFilterSideBar: false,
        }
    },
    actions: {
        async applyFilters() {
            this.loading = true;
            try {
                
                const conditions = this.filters.map(f => `like(${f.type},'${f.value}')`);
                const rawfilter = `and(${conditions.join(',')})`;
                
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
                        searchfilter: "",
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
        this.filters.push({
            type: "Shortname",
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