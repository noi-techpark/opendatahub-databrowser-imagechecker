<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
    <tr v-for=" item in props.data.Items" :key="item.Id" @click="selectedRow = item.Id "
        :class="[
            'hover:bg-green-400/10 hover:border-gray-400 border-2 border-gray-200 group ',
            selectedRow === item.Id ? 'bg-green-400/10' : ''
        ]"
    >

        <TableCell v-for="col in props.columnData" :key="col.key" :class="selectedRow === item.Id ? 'border-gray-400' : ''">

            <!-- if the column has a component (ex: showImages) -->
            <component v-if="col.component" :is="col.component" :imageGallery="item.ImageGallery" v-bind="col.props"/>

            <!-- else show the value directly-->
            <div v-else>
                {{ col.getValue ? col.getValue(item, accommodationStore.language.toLowerCase()) : ""}}
            </div>

        </TableCell>


        <!--Detail Column-->
        <TableCell class = "sticky right-0 z-10 bg-white border min-w-44  whitespace-nowrap shadow-[0px_5px_10px_-5px_gray] "> 

            <div class="flex flex-row space-x-2 justify-center ">

                <DetailButton class = "w-12" @click ="openRawView(item)" > 
                    <CodeBracketIcon class = "size-5 text-green-400"/>
                    <p class = "text-3xs font-semibold text-green-400">RAW</p>
                </DetailButton>
            
                <!--
                <DetailButton class = " w-12" > 
                    <CursorArrowRaysIcon class = "size-5 text-green-400"/>
                    <p class = "text-3xs font-semibold   text-green-400">ACTIONS</p>
                </DetailButton>
                -->
                
                <DetailButton @click = "openFullView(item)">
                    <PhotoIcon class =" size-5 text-green-400"/>
                    <p class = "text-3xs font-semibold   text-green-400"> IMAGES</p>
                </DetailButton>

            </div>
            
        </TableCell>


        <ImagesCarousel v-if = "fullViewItem" :item="fullViewItem"  @close="fullViewItem = null" />

    </tr> 
</template>

<script setup lang="ts">
//ICONS


  import { PhotoIcon, CodeBracketIcon } from '@heroicons/vue/24/outline'
  
  import TableCell from '@/components/table/TableCell.vue'
  import DetailButton from '@/components/buttons/DetailButton.vue'

  import { ref } from 'vue'
  import { useAccommodationStore } from '@/stores/AccomodationStore'
  import ImagesCarousel from './images/ImagesCarousel.vue'
  import type { Accommodation } from './types';
  import type { ColumnItem } from './ColumnValues'
  
    const props = defineProps<{
        data: { Items: Accommodation[]},
        columnData: ColumnItem[]

    }>()

    const emit = defineEmits<{
        (e: 'showRaw', item: Accommodation): void
    }>()

  const selectedRow = ref<number | null>(null)
  const fullViewItem = ref<Accommodation | null>(null)  
 
  const accommodationStore = useAccommodationStore()


  function openFullView(item: Accommodation) {
    fullViewItem.value = item
  }

  const openRawView = (Item: Accommodation) => {
    emit('showRaw', Item)
  }

</script>

<style scoped>

  table, th, td, tr {
    @apply border-[1.5px] group-hover:border-gray-400
  }

</style>