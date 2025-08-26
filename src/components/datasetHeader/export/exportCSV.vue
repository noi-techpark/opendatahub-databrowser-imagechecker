<template>

    <DatasetHeaderButton @click = "exportCSV()"> 
        <ArrowDownOnSquareIcon class="size-5 text-green-400"></ArrowDownOnSquareIcon>
        <p> Export </p> 
    </DatasetHeaderButton>


</template>

<script setup lang="ts">
    import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/outline';

    import DatasetHeaderButton from '../datasetHeaderButton.vue';
    import api from '@/components/utils/api';

    import { useAccommodationStore } from '@/stores/AccomodationStore';
    


    const accommodationStore = useAccommodationStore() 





    async function exportCSV(){

        const rawfilter = extractRawFilter()
        const language = accommodationStore.language.toLowerCase()
        const pagesize = accommodationStore.pagesize
        const pagenumber = accommodationStore.pagenumber
       
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
        const cleanResults = results.replace(/,/g, ";");
        const blob = new Blob([cleanResults], { type: "text/csv;charset=utf-8;" });

        
        //creating blob and downloading
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "accommodations.csv"); 

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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