<template>
<div class = "flex flex-row space-x-2">
     <button @click = "updatePageNumber(--footerStore.pagenumber)">
            <ChevronLeftIcon class =" size-4 text-green-400"/> 
        </button>
    
    <div class = "flex flex-row border rounded-lg border-gray-400">   

        <input class = "border-none rounded-lg bg-transparent w-14 flex text-green-400 text-sm" :placeholder="footerStore.CurrentPage.toLocaleString()"
                v-model="footerStore.pagenumber"
                @keyup.enter = "updatePageNumber(footerStore.pagenumber)" >

        </input>
        <button class = "bg-green-400 border-r rounded-lg w-14"
                @click = "accommodationStore.updateAndFetch(router, route)">
            <p class = "text-white">Go</p>
        </button>

    
    </div>
    
         <button @click = "updatePageNumber(++footerStore.pagenumber)">
            <ChevronRightIcon class = "size-4 text-green-400"/>
        </button>

</div>
</template>


<script setup lang="ts">

    import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
    import { useFooterStore } from '@/stores/FooterStore';
    import { useAccommodationStore } from '@/stores/AccomodationStore';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute()
    const router = useRouter()

    const footerStore = useFooterStore()
    const accommodationStore = useAccommodationStore()

    function updatePageNumber(pagenumber: number){

        if(pagenumber > footerStore.TotalPages)
            footerStore.pagenumber = footerStore.TotalPages
        else if(pagenumber <= 0 )
            footerStore.pagenumber = 1
        else
            footerStore.pagenumber = pagenumber
        
            
        accommodationStore.updateAndFetch(router, route)
    }


</script>