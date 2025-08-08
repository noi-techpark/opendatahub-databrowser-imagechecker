<template>
<div class=" max-h-[80vh] w-full overflow-x-auto">
  <div class="flex flex-row w-full">
    <table class="min-w-full w-full border border-gray-300 table-fixed" cellspacing="0" cellpadding="5">


      <TableHeader class = " sticky top-0 z-20 bg-gray-50 shadow-md">
        
        <TableHeaderCell>Id</TableHeaderCell>
         <TableHeaderCell>Title</TableHeaderCell>
         <TableHeaderCell>Main Image</TableHeaderCell>
         <TableHeaderCell>Image Winter</TableHeaderCell>
         <TableHeaderCell>Image Summer</TableHeaderCell>
         <TableHeaderCell>Image Whole Year</TableHeaderCell>
         <TableHeaderCell>Accomodation Type</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Region</TableHeaderCell>
          <TableHeaderCell>Municipality</TableHeaderCell>
          <TableHeaderCell>Badges</TableHeaderCell>
          <TableHeaderCell>Themes</TableHeaderCell>
          <TableHeaderCell>Tags</TableHeaderCell>
          <TableHeaderCell>Languages</TableHeaderCell>
          <TableHeaderCell>Edited</TableHeaderCell>
          <TableHeaderCell>Source</TableHeaderCell>
          <TableHeaderCell>Source state</TableHeaderCell>
          <TableHeaderCell>Published on</TableHeaderCell>
          <TableHeaderCell>Push data</TableHeaderCell>
          <TableHeaderCell class = "sticky right-0 bg-gray-50 w-52 z-30 border shadow-[inset_8px_0_8px_-8px_rgba(0,0,0,0.1)]">Detail</TableHeaderCell>
      </TableHeader>
     
      

       

      <tbody>
        <tr v-for=" item in quote.Items" :key="item.Id" 
          @click="selectedRow = item.Id"
            :class="[
              'hover:bg-green-100 cursor-pointer',
              selectedRow === item.Id ? 'bg-green-200' : ''
            ]"
          >
          
          <TableCell class = "whitespace-normal break-all">{{ item.Id }}</TableCell>
          <TableCell> 
             {{ item.ImageGallery?.[0]?.ImageDesc?.it || 'Nessun Titolo' }}
          </TableCell>

          <TableCell>
            <showImages :imageGallery="item.ImageGallery" period = "mainImage"></showImages>
          </TableCell>

          <TableCell> 
            <showImages :imageGallery="item.ImageGallery" period = "winter"></showImages>
          </TableCell>

          <TableCell> 
            <showImages :imageGallery="item.ImageGallery" period = "summer"></showImages>
          </TableCell>

          <TableCell> 
            <showImages :imageGallery="item.ImageGallery" period = "year"></showImages>
          </TableCell>
            
          <TableCell >{{ item.AccoType.Id }}</TableCell>

          <TableCell>{{ item.AccoCategory.Id }}</TableCell>

          <TableCell>{{ item.LocationInfo.RegionInfo.Name.it }}</TableCell>

          <TableCell>{{ item.LocationInfo.MunicipalityInfo.Name.it }}</TableCell>

          <TableCell>{{ item.AccoBadges }}</TableCell>

          <TableCell>{{ item.AccoThemes }}</TableCell>

          <TableCell>{{ item.ODHTags }}</TableCell>

          <TableCell>{{ item.HasLanguage.toString() }}</TableCell>

          <TableCell class = "">{{ formatEditDate(item._Meta.LastUpdate) }}</TableCell>

          <TableCell>{{ item._Meta.Source }}</TableCell>

          <TableCell>{{ item.Active ? "active" : "Not active" }}</TableCell>

          <TableCell>{{ item.PublishedOn }}</TableCell>

          <TableCell>{{ item.ODHTags }}</TableCell>

          <TableCell class = "sticky right-0 z-10 bg-white border bg-white shadow-[inset_8px_0_8px_-8px_rgba(0,0,0,0.1)] w-52 whitespace-nowrap">  details details</TableCell>

        </tr>
      </tbody>
    </table>

   


    </div>
  </div>
</template>



<script setup lang="ts">

import { ref } from 'vue'
import axios from 'axios'

import TableCell from '@/components/table/TableCell.vue'
import TableHeader from '@/components/table/TableHeader.vue'
import TableHeaderCell from '@/components/table/TableHeaderCell.vue'
import showImages from './showImages.vue'

//VARS
const imageNotFound ='https://imgs.search.brave.com/LeS4HHKZ1oz1T15VY5MwiUjWDjLiYKj0vgRABB3D2BY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2Lzg2LzE5LzM0/LzM2MF9GXzY4NjE5/MzQwN19ESFp3amV5/ZEJPUjF0RURrTEF6/d00zdzVrWXN0Unp6/Qi5qcGc'
const winterDate = '2020-01-15T00:00:00'
const summerDate = '2020-07-15T00:00:00'

//STATE
const quote: any = ref([])
const selectedRow = ref<number | null>(null)

//FETCH
axios
  .get(
    'https://tourism.api.opendatahub.testingmachine.eu/v1/Accommodation?pagenumber=1&pagesize=20&roominfo=1-18%2C18&bokfilter=hgv&msssource=sinfo&availabilitychecklanguage=en&detail=0&removenullvalues=false&getasidarray=false'
  )
  .then(response => {
    quote.value = response.data
  })

//FUNCTIONS
function formatEditDate(EditDate: string): string {
  return EditDate.split('.')[0]
}

</script>

