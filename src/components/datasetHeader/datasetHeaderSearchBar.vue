<template>

    <div class = "flex flex-row items-center h-10 min-w-10 p-2 m-1 
        border rounded border-gray-300 hover:border-green-400
        bg-white  hover:bg-green-100 relative z-10">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        

        <input class = "    h-9 min-w-10 p-2 m-1 border-none  hover:border-green-400  bg-transparent hover:bg-green-100" 
        placeholder="insert search value" type="text" v-model="searchStore.searchValue" @keyup.enter="searchStore.search">

        </input>

        <button class = "bg-green-500 border rounded border-gray-50 m-1 p-2 text-white text-xs hover:bg-green-700"
        @click="searchStore.search">Search</button>

    </div>
</template>

<script setup lang="ts">

    import { useSearchStore } from '@/stores/HeaderTableStore'

    const searchStore = useSearchStore();
</script>

