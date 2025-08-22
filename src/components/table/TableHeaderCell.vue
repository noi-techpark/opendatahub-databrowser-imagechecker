<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <th class="px-2 py-4 leading-tight text-gray-900 md:p-4 w-40 border-gray-200 border-2 " >

    <div class = " flex flex-row relative font-semibold">

      <slot />
      

        <ChevronDoubleDownIcon v-if = "descendingCheck" class = "size-4 text-green-400"/>
        <ChevronDoubleUpIcon v-if = "ascendingCheck" class = "size-4 text-green-400"/>
      <chevron-down-icon v-if = "showSort" class = "h-full size-3 cursor-pointer ml-auto" @click = "isOpen = !isOpen" :class = "isOpen? ' rotate-180' : ''"></chevron-down-icon>

      <div v-if="isOpen" class =  " absolute left-24 top-4 mt-2 bg-white border border-gray-300 rounded shadow-lg h-64 w-64 z-50
                                  flex flex-row items-center justify-center space-x-5">  <!--TODOO could be a component on its own-->
     
            <DatasetHeaderButton >
              <input type="checkbox" name="option1" v-model="ascendingCheck" @change="orderAscending()"></input>
              <p>Ascending</p>
            </DatasetHeaderButton>

            <DatasetHeaderButton >
              <input type="checkbox" name="option2" v-model="descendingCheck" @change="orderDescending()"></input>
              <p>Descending</p>
            </DatasetHeaderButton>
    
      </div>
      
    </div>
   
  </th>
</template>

<script setup lang="ts">

  import { ChevronDownIcon, ChevronDoubleUpIcon, ChevronDoubleDownIcon } from '@heroicons/vue/24/outline';
  
  import DatasetHeaderButton from '../datasetHeader/datasetHeaderButton.vue';

  import { useAccommodationStore } from '@/stores/AccomodationStore';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  
  const route = useRoute()
  const router = useRouter()
  const accommodationStore = useAccommodationStore()
  const isOpen = ref(false)
  const ascendingCheck = ref(false)
  const descendingCheck = ref(false)
  
  onMounted(() => {
    if(String(route.query.rawsort) === props.type)
      ascendingCheck.value = true
    if(String(route.query.rawsort) === "-" + props.type)
      descendingCheck.value = true

  })

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
    
  
  function orderAscending(){
    if (ascendingCheck.value) {
      accommodationStore.rawsort = props.type
      accommodationStore.updateAndFetch(router, route)
    } else {
      disableRawSort()
    }
  }

  function orderDescending(){
    if(descendingCheck.value){
    accommodationStore.rawsort = "-" + props.type
    accommodationStore.updateAndFetch(router, route)
    } else {
      disableRawSort()
    }
  }

  function disableRawSort(){
    accommodationStore.rawsort = ""
    accommodationStore.updateAndFetch(router, route)
  }

  
</script>



