<template>

    <div class = "flex flex-row items-center 
        h-10 min-w-10 p-1 m-1  relative z-10
        border rounded border-gray-300 hover:border-green-400
        bg-white  hover:bg-green-400/10">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-green-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        

        <input class = "    h-9 min-w-10 p-2 m-1 border-none   bg-transparent" 
        placeholder="insert search value" type="text" v-model="accommodationStore.searchValue" @keyup.enter="accommodationStore.updateAndFetch(router, route)">
        </input>


        <button class = "bg-green-500 border rounded p-2 jus text-white text-xs hover:bg-green-700  font-bold"
        @click="accommodationStore.updateAndFetch(router, route)">Search</button>

      

    </div>
</template>

<script setup lang="ts">

    

    import { useRoute, useRouter } from 'vue-router';

    import { useAccommodationStore } from '@/stores/AccomodationStore';
    

    const router = useRouter();
    const route = useRoute();
    const accommodationStore = useAccommodationStore()


   
  


</script>

