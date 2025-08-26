<template>

    <div class = "flex flex-row items-center 
        h-10 p-1 relative z-10
        border rounded border-gray-300 hover:border-green-400
        bg-white  hover:bg-green-400/10">

        <magnifying-glass-icon class = "size-5 text-green-400"></magnifying-glass-icon>

        

        <input class = "    h-9 min-w-6 p-2 m-1 border-none   bg-transparent text-sm" 
        placeholder="insert search value" type="text" v-model="searchValue" @keyup.enter="handleSearch()">
        </input>


        <button class = "bg-green-500 border rounded p-2 jus text-white text-xs hover:bg-green-700  font-bold"
        @click=" handleSearch()">
            Search
        </button>

      

    </div>
</template>

<script setup lang="ts">
        
    import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

    import { useRoute, useRouter } from 'vue-router';

    import { useAccommodationStore } from '@/stores/AccomodationStore';

    import { ref } from 'vue';

    const searchValue = ref("")
    const router = useRouter();
    const route = useRoute();
    const accommodationStore = useAccommodationStore()

    searchValue.value = route.query.searchfilter ? String(route.query.searchfilter): ""



    function handleSearch() {

        accommodationStore.pagenumber = 1
        accommodationStore.searchfilter = searchValue.value
        accommodationStore.updateAndFetch(router, route)
    }

  
</script>

