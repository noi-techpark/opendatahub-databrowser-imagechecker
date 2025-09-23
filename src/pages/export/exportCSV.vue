<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>

    <ExportCSVButton @click = "calculateAndExport"
    :class="isPulsing ? 
            'animate-pulse bg-yellow-400/10 border-yellow-400 border-2 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400' : ''"
    >
        <ArrowDownOnSquareIcon class="size-5 text-green-400"></ArrowDownOnSquareIcon>  
    </ExportCSVButton>

</template>

<script setup lang="ts">
    import ExportCSVButton from '@/components/buttons/ExportCSVButton.vue';
    import api from '@/components/utils/api';

    import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/outline';
  
    import { useAccommodationStore } from '@/stores/AccomodationStore';
    import { ref, computed } from 'vue';


    const isPulsing = ref(false)
    const csvData = ref<string | null>(null);
    const accommodationStore = useAccommodationStore() 
    

    const fields = computed( () =>
     [
            "Id",
            `AccoDetail.${accommodationStore.language.toLowerCase()}.Name`,
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
        ]   
    )



    async function fetchResults(){
        
        const rawfilter = accommodationStore.rawfilter
        const language = accommodationStore.language.toLowerCase()
        const pagesize = accommodationStore.pagesize
        const pagenumber = accommodationStore.pagenumber
        const typefilter = accommodationStore.typefilter
        const rawsort = accommodationStore.rawsort
        
        const response = await api.get(`Accommodation?fields=${fields.value.join(",")}&format=csv`, {
            params: {
                pagenumber,
                pagesize,
                language,
                searchfilter: accommodationStore.searchfilter || undefined,
                rawfilter,
                typefilter,
                rawsort
            },
        })
        
        const results = response.data
        return results
    }

    async function calculateAndExport() {
        
        const results = await fetchResults();  
        csvData.value = results;   
        
      
        exportCSV(results);     

        isPulsing.value = true;
        setTimeout(() => {
            isPulsing.value = false;
        }, 800);
    }

    async function exportCSV(results: string){
    
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
    
    


</script>