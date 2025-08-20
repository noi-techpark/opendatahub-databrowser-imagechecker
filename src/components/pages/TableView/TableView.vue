<template>

  
<div class=" max-h-screen h-full  w-full overflow-auto">
   
    
    <!--TODOO add Loading animation or icon-->
    <div v-if="accommodationStore.loading" class="p-4 text-center w-full h-full">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>
    </div>

    
    <table class="min-w-full w-full table-fixed  border-separate  " cellspacing="0" cellpadding="5" v-if = "!accommodationStore.loading">

  
      <TableHeader class = " sticky top-0 z-20">
        <TableHeaderCell>ID</TableHeaderCell>   <!--TODOO just for debug, delete ID-->
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
        <TableHeaderCell class = "sticky right-0 bg-gray-50 w-52 z-30 border shadow-[inset_4px_0_4px_-4px_rgba(0,0,0,0.1)]">Detail</TableHeaderCell>
        
      </TableHeader>

      

      

       <!--TODOO Reformat, This is Bad-->

      <tbody class = "">
        <tr v-for=" item in accommodationStore.results.Items" :key="item.Id" 
          @click="selectedRow = item.Id"
            :class="[
              'hover:bg-green-400/10 hover:border-gray-400 border-2 border-gray-200 group',
              selectedRow === item.Id ? 'bg-green-400/10' : ''
            ]"
        >
          <TableCell class = "whitespace-normal break-words">
            {{  item.Id }}
          </TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''" >
             {{ item.AccoDetail?.[languageStore.language.toLowerCase()]?.Name || 'nessun titolo' }}   <!--shortName o ImageDesc???-->
          </TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">
            <showImages :imageGallery="item.ImageGallery" period = "mainImage"></showImages>
          </TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''"> 
            <showImages :imageGallery="item.ImageGallery" period = "winter"></showImages>
          </TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''"> 
            <showImages :imageGallery="item.ImageGallery" period = "summer"></showImages>
          </TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''"> 
            <showImages :imageGallery="item.ImageGallery" period = "year"></showImages>
          </TableCell>
            
          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">{{ item.AccoType?.Id || "not found" }}</TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">{{ item.AccoCategory?.Id || "not found"}}</TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">
             {{ item.LocationInfo?.RegionInfo?.Name?.[languageStore.language.toLowerCase()] || "not found" }} 
          </TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">
            {{ item.LocationInfo?.MunicipalityInfo?.Name?.[languageStore.language.toLowerCase()] || "not found" }}
          </TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">
            {{ formatObject(item.AccoBadges)}}
          </TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''"> {{ formatObject(item.AccoThemes) }}</TableCell> 

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">{{ formatObject(item.ODHTags) }}</TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">{{ item.HasLanguage.toString() }}</TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">
            {{ formatEditDate(item._Meta?.LastUpdate || "not found") }}
          </TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">
            {{ item._Meta?.Source || "not found" }}
          </TableCell>

          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">
            {{ item.Active ? "active" : "Not active" }}
          </TableCell>


      
          <TableCell :class="selectedRow === item.Id ? 'border-r-gray-400 border-r-2' : ''">{{ formatArray(item.PublishedOn)}}</TableCell>

          <TableCell > push data</TableCell>    <!-- TODOO this is a placeholder value, push data goes here-->

          <TableCell class = "sticky right-0 z-10 bg-white border w-52 whitespace-nowrap shadow-[inset_4px_0_4px_-4px_rgba(0,0,0,0.1)]"> 
            <div class="flex flex-row space-x-2 justify-center ">

              <DetailButton class = " w-20 h-16"> 
                <PencilSquareIcon class = "size-6 text-green-400"></PencilSquareIcon>
                <p class = "text-sm text-green-400">EDIT</p>
              </DetailButton>

              <DetailButton class = " w-20 h-16"> 
       
                <CursorArrowRaysIcon class = "size-6 text-green-400"></CursorArrowRaysIcon>
                <p class = "text-sm text-green-400">ACTIONS</p>
              </DetailButton>
            </div>
          </TableCell>

        </tr>
      </tbody>
    </table>


   


   
  </div>
</template>



<script setup lang="ts">

  //ICONS
  import { CursorArrowRaysIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

  import TableCell from '@/components/table/TableCell.vue'
  import TableHeader from '@/components/table/TableHeader.vue'
  import TableHeaderCell from '@/components/table/TableHeaderCell.vue'
  import showImages from './showImages.vue'
  import DetailButton from '@/components/buttons/DetailButton.vue'

  import { ref, onMounted } from 'vue'
  import { useLanguageStore } from '@/stores/HeaderTableStore'
  import { useAccommodationStore } from '@/stores/AccomodationStore'
  import { useRoute, useRouter } from 'vue-router'
  import { useAuth } from '@/auth/authStores/auth'
import { useFooterStore } from '@/stores/FooterStore'
import { keycloak } from '@/auth/keycloak'



  const selectedRow = ref<number | null>(null)
  const languageStore = useLanguageStore()


  const route = useRoute()
  const router = useRouter()

  const accommodationStore: any = useAccommodationStore()
  const auth = useAuth()
  


  //INITIAL FETCH //TODOO this is the initial fetch that happens after every reload, mght be good to put it in a place that makes sense, like accommodationStore
  onMounted(() => {
      const savedToken = localStorage.getItem('kc_token')
      if (savedToken) {
        auth.authenticate(savedToken)
        keycloak.token = savedToken
      }

      accommodationStore.restoreFromUrl(route);
      accommodationStore.fetchData(router, route);
  });



  function formatEditDate(EditDate: string): string {
    const result = EditDate.replace("T", " ").split('.')[0]
    return result
  }

  //formats object Id: x, Self: y,  in string Id1, Id2, Id3 ...
  function formatObject(object: { Id: string }[] | null | undefined): string {
    if (!object || object.length === 0) 
      return "-"; //fallaback if null or undefined

    return object.map(obj => obj.Id).join(",\n");
  }
  
  function formatArray(Array: string[] | null | undefined): string {
    if(!Array || Array.length === 0)
      return "-"

    return Array.map(obj => obj).join(",\n");
  }

</script>




<style scoped>

  table, th, td, tr {
    @apply border
  }

</style>


