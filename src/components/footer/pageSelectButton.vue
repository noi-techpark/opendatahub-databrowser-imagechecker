<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
<div class = "flex flex-row space-x-2">
     <button @click = "updatePageNumber(--pagenumberRef)">
            <ChevronLeftIcon class =" size-4 text-green-400"/> 
        </button>
    
    <div class = "flex flex-row border rounded-lg border-gray-400">   

        <input class = "border-none rounded-lg bg-transparent w-14 flex text-green-400 text-sm" 
                v-model="pagenumberRef"
                @keyup.enter = "updatePageNumber(pagenumberRef)" >

        </input>
        <button class = "bg-green-400 border-r rounded-lg w-14"
                @click = "updatePageNumber(pagenumberRef)">
            <p class = "text-white">Go</p>
        </button>

    
    </div>
    
         <button @click = "updatePageNumber(++pagenumberRef)">
            <ChevronRightIcon class = "size-4 text-green-400"/>
        </button>

</div>
</template>


<script setup lang="ts">

    import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
    import { ref, watch } from 'vue';

    const pagenumberRef = ref(1)


    function updatePageNumber(pagenumber: number){
        console.log("emit")
        emit("UpdatePageNumber", pagenumber)
    }


    const props = defineProps<{
        pageNumber: number
    }>()

    const emit = defineEmits<{
        (e: "UpdatePageNumber", pagenumber: number): void
    }>()

    watch(() => props.pageNumber, (val) => {
        pagenumberRef.value = val
    })


</script>

