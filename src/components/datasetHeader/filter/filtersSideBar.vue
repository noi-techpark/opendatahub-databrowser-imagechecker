<template>
    <div class = " left-0 bg-gray-50 w-52 z-30 border shadow-[inset_8px_0_8px_-8px_rgba(0,0,0,0.1)]">
     
            <div class =" h-[70px] bg-gray-250 border rounded justify-center items-center flex"> <p>Filters</p></div>
          

            <div class = "flex flex-row">
                <p class ="ml-5 mt-5 "> <b>x</b> records out of <b>y</b></p>
                <DatasetHeaderButton> Reset All Filters</DatasetHeaderButton>
            </div>

            <div class ="bg-white m-4 border rounded max-h-[450px] overflow-y-auto"> 
                <FilterTable></FilterTable>
            </div>
    </div>

</template>

<script setup lang="ts">


import DatasetHeaderButton from '../datasetHeaderButton.vue';
import FilterTable from './filterTable.vue';


</script>