<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->


<template>
    <div class="flex flex-col p-3 gap-1 max-w-96 w-96">

        <div class = "flex flex-row items-center justify-between">
            <p class=" font-bold"> Accommodation Image Checker</p>
            <button class = "text-3xl" @click = "emit('close')">&times;</button>
        </div>

        <p class =" text-balance mb-2"> This dataset provides a comprehensive list of accommodation, including hotels, guesthouses and other types of accommodation, aswell as a selection of representative images by season  </p>
        
        <button class = " flex flex-row justify-center hover:bg-green-400/10 text-green-400 border border-gray-400 rounded p-2"
                @click="openDatasetDetails()"> 
            <p>Dataset Details</p>
        </button>
        
  </div>
</template>


<script setup lang="ts">
    const emit  = defineEmits(['close'])

    const openDatasetDetails = () => {
    window.open("https://databrowser.opendatahub.com/dataset-overview/7c8f490d-7b54-4a88-801f-f7669f5aaed9", "_blank")
    }

</script>