import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useLanguageStore } from "./HeaderTableStore";

interface Filter {
    type: string;
    comparison: string;
    value: string;
}

export const useAccommodationStore = defineStore("accommodation", {
    state: () => {
        const languageStore = useLanguageStore();
        return {
            searchValue: "",
            results: [] as any[],
            filters: [
                {
                    type: `AccoDetail.${languageStore.language.toLowerCase()}.Name`,
                    comparison: "like",
                    value: "",
                } as Filter,
            ],
            loading: false,
            showFilterSideBar: false,
        };
    },

    actions: {
        //Updates URL, and fetches Data accordingly
        async updateAndFetch(router?: ReturnType<typeof useRouter>, route?: ReturnType<typeof useRoute>) {
            console.log("UPDATE AND FETCH: ")
            if (router && route) {
                const newQuery = { ...route.query };

                if (this.searchValue) {
                    newQuery.searchfilter = this.searchValue;
                } else {
                    delete newQuery.searchfilter;
                }

                const conditions = this.filters
                    .filter(f => f.value.trim() !== "")
                    .map(f => `like(${f.type},'${f.value}')`);  //TODOO inserire filter.comparison invece di like

                if (conditions.length === 1) {
                    newQuery.rawfilter = conditions[0]; 
                } else if (conditions.length > 1) {
                    newQuery.rawfilter = `and(${conditions.join(",")})`; 
                } else {
                    delete newQuery.rawfilter;
                }

                const languageStore = useLanguageStore()
                console.log(languageStore.language + " --> lingua slezionata")
                newQuery.language = languageStore.language.toLowerCase()



                router.replace({ query: newQuery });
            }
            await this.fetchData();
        },

 
        async fetchData() {
            this.loading = true;

            //at the start, we display the selected language in the URL
            const languageStore = useLanguageStore()
            
         
            try {
                const conditions = this.filters
                    .filter(f => f.value.trim() !== "")
                    .map(f => `${f.comparison}(${f.type},'${f.value}')`);

                const rawfilter = conditions.length > 0
                    ? `and(${conditions.join(",")})`
                    : undefined;

                const language = languageStore.language.toLowerCase()

                    

                const response = await axios.get("https://tourism.api.opendatahub.testingmachine.eu/v1/Accommodation", {
                    params: {
                        pagenumber: 1,
                        pagesize: 25,
                        language,
                        roominfo: "1-18,18",
                        bokfilter: "hgv",
                        msssource: "sinfo",
                        availabilitychecklanguage: "en",
                        detail: 0,
                        searchfilter: this.searchValue || undefined,
                        rawfilter,
                        removenullvalues: false,
                        getasidarray: false,
                    },
                });

                this.results = response.data;
            } catch (error) {
                console.error("Error fetching accommodations:", error);
            } finally {
                this.loading = false;
            }
        },

        // restore query state from URL
        restoreFromUrl(route: ReturnType<typeof useRoute>) {
           
            //restores searchFilter
            if (route.query.searchfilter) {
                this.searchValue = String(route.query.searchfilter);
            } else {
                this.searchValue = "";
            }

            console.log("searchfilter in URL = ", this.searchValue)

            //Restores all filters (comparison, type, value) from rawfilter, this way filters on the sidebar dont disappear when page is refreshed
            if (route.query.rawfilter) {
                let raw = String(route.query.rawfilter);
                
                if (raw.startsWith("and(") && raw.endsWith(")")) { //removes extra "And(..)"" that appears when there is more than one filter
                    raw = raw.slice(4, -1); 
                }
                
                
                const regex = /(\w+)\(([^,]+),'([^']+)'\)/g;    //divides each argument in rawfilter string in the 3 values below
                this.filters = [];
                let match;
                while ((match = regex.exec(raw)) !== null) {
                    console.log(match[1])
                    const comparison = match[1]; // eq, like, etc.
                    const type = match[2];
                    const value = match[3];
                    this.filters.push({ comparison, type, value });
                }
            } else {
                this.filters = [];
            }

            if(route.query.language){
                const languageStore = useLanguageStore()
                languageStore.language = String(route.query.language).toUpperCase()
            }

        },

       
        addFilter() {
            const languageStore = useLanguageStore();
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
});
