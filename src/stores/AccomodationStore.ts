import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";


export interface Filter {
    type: string;
    comparison: string;
    value: string;
}

export const useAccommodationStore = defineStore("accommodation", {
    state: () => {
      
        return {
            
            
            //search and filter parameters
            language: "DE",
            searchfilter: "",
            typefilter: "",
            rawsort: "",
            rawfilter: "",
            filters: [] as Filter[],
            loading: false,
            
            //pagination parameters
            pagenumber: 1,
            pagesize: 25,
            TotalResults: 0,
            TotalPages: 0,
            CurrentPage: 0,
            PreviousPage: "",
            NextPage: "",
            FirstTotalResults: 0,

            //for comunication between components
            filtersRef: [] as Filter[],
            showFilterSideBar: false,
            APIurl: ""
        };
    },

    actions: {
        /*
        async fetchData(router?: ReturnType<typeof useRouter>, route?: ReturnType<typeof useRoute>) {
            this.loading = true;
            const languageStore = useLanguageStore()
            const footerStore = useFooterStore()
            
            

            //filters the "Filters" that dont have a value, with the exception of isnull and isnotnull filterTypes
            try {

                
                const conditions = this.filters
                .filter(f => {
                    if (f.comparison.toLowerCase() === "isnull" || f.comparison.toLowerCase() === "isnotnull") {
                    return true
                    }
                    return f.value.trim() !== ""
                })
                .map(f => {
                    if (f.comparison.toLowerCase() === "isnull" || f.comparison.toLowerCase() === "isnotnull") {
                    return `${f.comparison}(${f.type})`
                    }
                    return `${f.comparison}(${f.type},'${f.value}')`
                });

            

                const rawfilter = conditions.length > 0
                    ? `and(${conditions.join(",")})`
                    : undefined;

                const language = languageStore.language.toLowerCase()
                const pagesize = footerStore.pagesize
                const pagenumber = footerStore.pagenumber
                
                               
                console.log("rawsort: " + this.rawsort)
                
                const response = await api.get("Accommodation", {
                    params: {
                        pagenumber,
                        pagesize,
                        language,
                        roominfo: "1-18,18",
                        bokfilter: "hgv",
                        msssource: "sinfo",
                        availabilitychecklanguage: "en",
                        detail: 0,
                        searchfilter: this.searchfilter || undefined,
                        typefilter: this.typefilter || null,
                        rawfilter,
                        rawsort: this.rawsort || null,
                        removenullvalues: false,
                        getasidarray: false,
                    },
                
                });

                this.results = response.data;
                this.APIurl = response.config.url ? response.config.url : ""
                

                //TODOO, there might be a better way, 2 api calls just for this variable is a waste
                if (footerStore.FirstTotalResults === 0) {
                    const responseNoFilter: any = await api.get("Accommodation");
                    footerStore.FirstTotalResults = responseNoFilter.data.TotalResults
                    console.log("first: " + footerStore.FirstTotalResults)
                }

              

            } catch (error) {
                console.error("Error fetching accommodations:", error);
            } finally {
                
                footerStore.TotalResults = (this.results as any)?.TotalResults ?? 0;
                console.log( "TOTAL RESULTS: " + footerStore.TotalResults)
               
                this.loading = false;
            }
        
        },
        */

        //Updates URL, and fetches Data accordingly
        async updateAndFetch(router?: ReturnType<typeof useRouter>, route?: ReturnType<typeof useRoute>) {

            if (router && route) {
                const newQuery = { ...route.query };

                if (this.searchfilter)
                    newQuery.searchfilter = this.searchfilter;
                else 
                    delete newQuery.searchfilter;


                if (this.typefilter)
                    newQuery.typefilter = this.typefilter
                else
                    delete newQuery.typefilter


                if(this.rawsort)
                    newQuery.rawsort = this.rawsort
                else
                    delete newQuery.rawsort

             
                const conditions = this.filters
                    .filter(f => {
                        if (f.comparison.toLowerCase() === "isnull" || f.comparison.toLowerCase() === "isnotnull") {
                            return true // isnull and isnotnull are allowed even without a value
                        }
                            return f.value.trim() !== ""
                    })
                    .map(f => {
                        if (f.comparison.toLowerCase() === "isnull" || f.comparison.toLowerCase() === "isnotnull") {
                           
                            return `${f.comparison}(${f.type})`
                        }
                        
                        return `${f.comparison}(${f.type},'${f.value}')`
                    });

                


                if (conditions.length === 1) {
                    newQuery.rawfilter = conditions[0]; 
                } else if (conditions.length > 1) {
                    newQuery.rawfilter = `and(${conditions.join(",")})`; 
                } else {
                    delete newQuery.rawfilter;
                }

            
               
                newQuery.language = this.language.toLowerCase()
                                //TODOO
                
                newQuery.pagesize = this.pagesize.toLocaleString()
                newQuery.pagenumber = this.pagenumber.toLocaleString()


                router.replace({ query: newQuery });
            }
            
        },

        // restore query state from URL
        restoreFromUrl(route: ReturnType<typeof useRoute>) {
           
            //restores searchFilter
            if (route.query.searchfilter)
                this.searchfilter = String(route.query.searchfilter);
            else 
                this.searchfilter = "";
            

            if(route.query.typefilter)
                this.typefilter = String(route.query.typefilter);
            else
                this.typefilter = ""

            if(route.query.rawsort)
                this.rawsort = String(route.query.rawsort);
            else
                this.rawsort = ""

            

            //Restores all filters (comparison, type, value) from rawfilter, this way filters on the sidebar dont disappear when page is refreshed
            if (route.query.rawfilter) {
                let raw = String(route.query.rawfilter);
                
                if (raw.startsWith("and(") && raw.endsWith(")")) { //removes extra "And(..)"" that appears when there is more than one filter
                    raw = raw.slice(4, -1); 
                }
                
                
                const regex = /(\w+)\(([^,]+)(?:,'([^']+)')?\)/g;    //divides each argument in rawfilter string in the 3 values below, 
                                                                    //third value is optional because isnull and isnotnull dont have the third value
                this.filters = [];
                let match;
                while ((match = regex.exec(raw)) !== null) {
                    
                    const comparison = match[1]; // eq, like, etc...
                    const type = match[2];  // title, image, etc...
                    const value = match[3]; 
                    this.filters.push({ comparison, type, value: value ?? ""  });
                }
            
            } else {
                this.filters = [];
            }
            
            

            //TODOO
            if(route.query.language){
                
                this.language = String(route.query.language).toUpperCase()
            }

            if(route.query.pagesize){
                
                this.pagesize = Number(route.query.pagesize)
            }

            if(route.query.pagenumber){
              
                this.pagenumber = Number(route.query.pagenumber)
            }

        },

       
        addFilter() {
           
            this.filters.push({
                type: `AccoDetail.${this.language.toLowerCase()}.Name`,
                comparison: "like",
                value: "",
            });
        },

        removeFilter(index: number, router?: ReturnType<typeof useRouter>, route?: ReturnType<typeof useRoute>) {
            this.filters.splice(index, 1);
            this.updateAndFetch(router, route)
        },

     
        }
    },

);
