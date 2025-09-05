<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <th class="min-w-36 leading-tight text-gray-900 md:p-4  border-gray-200 border-2 " ref = "target"  >

    <div class = "flex flex-row relative font-bold text-sm items-center " >

      <div class = "flex justify-between  w-full items-center text-sm font-bold gap-2 "  @click = "isOpen = !isOpen">

        <slot />
          
        <ChevronDoubleDownIcon v-if = "isActive && descendingCheck" class = "size-4 text-green-400"/>
        <ChevronDoubleUpIcon v-if = "isActive && ascendingCheck" class = "size-4 text-green-400"/>
            
        <chevron-down-icon v-if = "showPopup" class = "h-full size-4 cursor-pointer "  :class = "isOpen? ' rotate-180' : ''"/>

      
      </div>

      <component
        v-if="isOpen "
        :is = "props.Popup"
        :parameter="props.parameter"
        @popup-event="handleSortUpdate"
      />
      
    </div>
   
  </th>
</template>

<script setup lang="ts">

  import { ChevronDownIcon, ChevronDoubleUpIcon, ChevronDoubleDownIcon } from '@heroicons/vue/24/outline';

  import { ref, computed, type Component } from 'vue';
  import { onClickOutside } from '@vueuse/core';


  const target = ref(null)
  const isOpen = ref(false)
  const ascendingCheck = ref(false)
  const descendingCheck = ref(false)
  const isActive = computed(() => props.parameter === props.activeSortColumn)

  const props = withDefaults(
    defineProps<{
      parameter?: string
      showPopup?: boolean
      Popup?: Component
      activeSortColumn?: string | null
    }>(),
    {
      parameter: '',
      showPopup: true,
   
    },
  )
  const emit = defineEmits(["emit-event"])


  function handleSortUpdate(payload: { ascending: boolean; descending: boolean; isOpen: boolean }){
    ascendingCheck.value = payload.ascending
    descendingCheck.value = payload.descending
    isOpen.value = payload.isOpen 
    emit("emit-event")
  }




  onClickOutside(target, () => {
    if(isOpen.value)
      isOpen.value = false
  })
</script>



