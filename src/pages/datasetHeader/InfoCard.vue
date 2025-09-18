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

        <p class="text-balance mb-2"> 
            This page provides a navigation interface for the Open Data Hub Accommodation dataset.<br/>
            The dataset offers a wide range of accommodations, including hotels, guesthouses, apartments, and other types of accommodations.<br/>
            The focus of this page is to make it easy for users to explore each accommodation’s Image Gallery in an intuitive way.
        </p>
        
        <button class = " flex flex-row justify-center hover:bg-green-400/10 text-green-400 border border-gray-400 rounded p-2"
                @click="openDatasetDetails()"> 
            <p>Explore the Dataset more in detail</p>
        </button>
        
  </div>
</template>


<script setup lang="ts">
    const emit  = defineEmits(['close'])


    const openDatasetDetails = () => {
    window.open("https://databrowser.opendatahub.com/dataset/table/tourism/v1/Accommodation", "_blank")
    }

</script>