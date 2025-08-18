

<template>
  <div class="w-full h-4 bg-gray-50 flex flex-row justify-end items-center space-x-3 p-10">

    <p class ="text-sm font-bold"> {{ footerStore.pagenumber == TotalPages ? footerStore.TotalResults % footerStore.pagesize : footerStore.pagesize}} 
        records out of {{ footerStore.TotalResults}} are shown</p>


    <DatasetHeaderDropDown :title = "footerStore.pagesize.toLocaleString()" width="min-w-12" arrow-size="size-3" show-down="bottom-full" >
      <DatasetHeaderButton v-for = "option in dropdownOptions" class = "border-none rounded-none" 
                          :class = "[option === footerStore.pagesize ? 'bg-green-400/10' : '']"
                          @click = "updatePageSize(option)">
        {{option}}
      </DatasetHeaderButton>
    </DatasetHeaderDropDown>


    <p> per page </p>

    <div class = "flex flex-row items-center">
      <PageSelectButton></PageSelectButton>
      <p class = "ml-3 text-sm"> of {{ TotalPages }}</p>
    </div>

   
    

  </div>
</template>

<script setup lang="ts">

//ICONS
import { computed } from 'vue';
import DatasetHeaderButton from '../datasetHeader/datasetHeaderButton.vue';
import DatasetHeaderDropDown from '../datasetHeader/datasetHeaderDropDown.vue';

import { useFooterStore } from '@/stores/FooterStore';
import { useAccommodationStore } from '@/stores/AccomodationStore';
import PageSelectButton from '../footer/pageSelectButton.vue';

import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

const accommodationStore = useAccommodationStore()
const footerStore = useFooterStore()

const dropdownOptions = [25, 50, 75, 100]

const TotalPages = computed(() => {
  if (!footerStore.pagesize) return 0
  return Math.ceil(footerStore.TotalResults / footerStore.pagesize)
})



function updatePageSize(option: number){
  footerStore.pagesize = option
  accommodationStore.updateAndFetch(router, route)
  
}


</script>
