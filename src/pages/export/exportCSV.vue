<template>

    <ExportCSVButton v-if = "csvData" :results="csvData">
        <ArrowDownOnSquareIcon class="size-5 text-green-400"></ArrowDownOnSquareIcon>  
    </ExportCSVButton>
     


</template>

<script setup lang="ts">
    import ExportCSVButton from '@/components/buttons/ExportCSVButton.vue';
    import api from '@/components/utils/api';

    import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/outline';
  
    import { useAccommodationStore } from '@/stores/AccomodationStore';
    import { useAccommodationsQuery } from '@/composable/useAccomodationsQuery';
    import { ref } from 'vue';
    import { watch } from 'vue';



    const csvData = ref<string | null>(null);
    const accommodationStore = useAccommodationStore() 
    const query = useAccommodationsQuery()

    const fields = [
            "Id",
            "AccoDetail.de.Name",
            "AccoType.Id",
            "AccoCategory.Id",
            `AccoDetail.${accommodationStore.language.toLowerCase()}.Street`,
            `AccoDetail.${accommodationStore.language.toLowerCase()}.Zip`,
            `LocationInfo.RegionInfo.Name.${accommodationStore.language.toLowerCase()}`,
            `LocationInfo.MunicipalityInfo.Name.${accommodationStore.language.toLowerCase()}`,
            `AccoDetail.${accommodationStore.language.toLowerCase()}.Email`,
            `AccoDetail.${accommodationStore.language.toLowerCase()}.Phone`,
            "ImageGallery[0].ImageUrl",
            "Check",
            "Comment",
        ];


    watch(query.data, async () =>{
        csvData.value = await calculateResults()
    })




    async function calculateResults(){
        
        const rawfilter = accommodationStore.rawfilter
        const language = accommodationStore.language.toLowerCase()
        const pagesize = accommodationStore.pagesize
        const pagenumber = accommodationStore.pagenumber

        const response = await api.get(`Accommodation?fields=${fields.join(",")}&format=csv`, {
            params: {
                pagenumber,
                pagesize,
                language,
                roominfo: "1-18,18",
                bokfilter: "hgv",
                msssource: "sinfo",
                availabilitychecklanguage: "en",
                detail: 0,
                searchfilter: accommodationStore.searchfilter || undefined,
                rawfilter,
                removenullvalues: false,
                getasidarray: false,
            },
        })
        
        const results = response.data
        return results
    }
    

    function extractRawFilter(): string | undefined{

        const conditions = accommodationStore.filters
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

        return rawfilter
    }

</script>