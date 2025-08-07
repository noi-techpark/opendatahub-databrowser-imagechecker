<template>
<div class="h-full w-full overflow-x-auto">
  <div class="min-w-full">
    <table class="min-w-[2000px] w-max border border-gray-300" cellspacing="0" cellpadding="5">



      <thead class = "sticky top-0 z-10 border-spacing-3 bg-gray-300">
        <tr >
          
          <th>ID</th><th>Title</th><th>Main Image</th><th>Image Winter</th><th>Image Summer</th><th>Image Whole Year</th><th>Accomodation Type</th>
          <th>Category</th><th>Region</th><th>Municipality</th><th>Badges</th><th>Themes</th><th>Tags</th><th>Languages</th><th>Edited</th>
          <th>Source</th><th>Source state</th><th>Published on</th><th>Push data</th>

        </tr>
      </thead>

      <tbody>
        <tr v-for=" item in quote.Items" :key="item.Id">

          <TableCell> {{ item.Id }}</TableCell>

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
          <TableCell>{{ item._Meta.LastUpdate }}</TableCell>
          <TableCell>{{ item._Meta.Source }}</TableCell>
          <TableCell>{{ item.Active ? "active" : "Not active" }}</TableCell>
          <TableCell>{{ item.PublishedOn }}</TableCell>
          <TableCell>{{ item.ODHTags }}</TableCell>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>



<script lang="ts">
import TableCell from '@/components/table/TableCell.vue';


import axios from 'axios';
import { ref, onMounted } from 'vue';
import type { Accommodation } from './types';
import showImages from './showImages.vue';

  export default{
      components: {
    TableCell,
    showImages
  },
    setup () {
      
      const imageNotFound = "https://imgs.search.brave.com/LeS4HHKZ1oz1T15VY5MwiUjWDjLiYKj0vgRABB3D2BY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2Lzg2LzE5LzM0/LzM2MF9GXzY4NjE5/MzQwN19ESFp3amV5/ZEJPUjF0RURrTEF6/d00zdzVrWXN0Unp6/Qi5qcGc"
      const winterDate = '2020-01-15T00:00:00'
      const summerDate = '2020-07-15T00:00:00'
      
      const quote: any = ref([])
      axios
        .get('https://tourism.api.opendatahub.testingmachine.eu/v1/Accommodation?pagenumber=1&pagesize=20&roominfo=1-18%2C18&bokfilter=hgv&msssource=sinfo&availabilitychecklanguage=en&detail=0&removenullvalues=false&getasidarray=false')
        .then(response => {

          quote.value = response.data

        })
      
      return { quote, imageNotFound, winterDate, summerDate}


    },

  }
</script>
