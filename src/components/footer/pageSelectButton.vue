<template>
<div class = "flex flex-row space-x-2">
     <button @click = "updatePageNumber(--accommodationStore.pagenumber)">
            <ChevronLeftIcon class =" size-4 text-green-400"/> 
        </button>
    
    <div class = "flex flex-row border rounded-lg border-gray-400">   

        <input class = "border-none rounded-lg bg-transparent w-14 flex text-green-400 text-sm" :placeholder="accommodationStore.CurrentPage.toLocaleString()"
                v-model="accommodationStore.pagenumber"
                @keyup.enter = "updatePageNumber(accommodationStore.pagenumber)" >

        </input>
        <button class = "bg-green-400 border-r rounded-lg w-14"
                @click = "accommodationStore.updateAndFetch(router, route)">
            <p class = "text-white">Go</p>
        </button>

    
    </div>
    
         <button @click = "updatePageNumber(++accommodationStore.pagenumber)">
            <ChevronRightIcon class = "size-4 text-green-400"/>
        </button>

</div>
</template>


<script setup lang="ts">

    import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
    import { useAccommodationStore } from '@/stores/AccomodationStore';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()


    const accommodationStore = useAccommodationStore()

    function updatePageNumber(pagenumber: number){

        if(pagenumber > accommodationStore.TotalPages)
            accommodationStore.pagenumber = accommodationStore.TotalPages
        else if(pagenumber <= 0 )
            accommodationStore.pagenumber = 1
        else
            accommodationStore.pagenumber = pagenumber
        
            
        accommodationStore.updateAndFetch(router, route)
    }


</script>