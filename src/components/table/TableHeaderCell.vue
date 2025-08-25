<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <th class=" min-w-36 px-2 py-4 leading-tight text-gray-900 md:p-4  border-gray-200 border-2 " >

    <div class = " flex flex-row relative font-bold text-sm items-center">

      <slot />
      

      <ChevronDoubleDownIcon v-if = "descendingCheck" class = "size-4 text-green-400"/>
      <ChevronDoubleUpIcon v-if = "ascendingCheck" class = "size-4 text-green-400"/>

      <chevron-down-icon v-if = "showSort" class = "h-full size-4 cursor-pointer ml-auto" @click = "isOpen = !isOpen" :class = "isOpen? ' rotate-180' : ''"/>

      <sortPopup v-if = "isOpen" :type="props.type" @update-sort="handleSortUpdate"  />
      
    </div>
   
  </th>
</template>

<script setup lang="ts">

  import { ChevronDownIcon, ChevronDoubleUpIcon, ChevronDoubleDownIcon } from '@heroicons/vue/24/outline';
  
  import sortPopup from '../pages/TableView/sortPopup.vue';

  import { ref } from 'vue';
  

  const isOpen = ref(false)
  const ascendingCheck = ref(false)
  const descendingCheck = ref(false)
 

  const props = withDefaults(
    defineProps<{
      type?: string
      showSort?: boolean
    }>(),
    {
      type: '',
      showSort: true

    },
  )

  function handleSortUpdate(payload: { ascending: boolean; descending: boolean }){
    ascendingCheck.value = payload.ascending
    descendingCheck.value = payload.descending
  }
    
  
</script>



