<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
    <div class = "
    p-2 h-10 
    border rounded border-gray-300 hover:border-green-400
     hover:bg-green-400/10
    ">
        <button class ="flex flex-row space-x-1 w-full" @click = "exportCSV()">
            <slot></slot>

            <p> Export </p>
        </button>
    </div>
</template>



<script setup lang="ts">

    const props = defineProps<{
        results: string | null
    }>()

    async function exportCSV(){

    
        if(props.results){
            
            const cleanResults = props.results.replace(/,/g, ";");
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
    }

</script>