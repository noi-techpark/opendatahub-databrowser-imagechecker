
<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-row justify-end items-center space-x-3  w-full h-4 bg-gray-50 p-[18px]    ">

    <p class ="text-sm font-semibold mr-5"> 
      {{ accommodationStore.pagenumber == TotalPages ? accommodationStore.TotalResults % accommodationStore.pagesize : accommodationStore.pagesize}} 
      records out of {{ accommodationStore.TotalResults}} are shown
    </p>


    <DatasetHeaderDropDown :title = "accommodationStore.pagesize.toLocaleString()" width="min-w-14 p-0" arrow-size="size-3" show-down="bottom-full" 
      custom-class-button="h-6" custom-class-content="h-1" class = "text-green-400 text-sm" :button-component="DatasetHeaderButton">

      <DatasetHeaderButton v-for = "option in dropdownOptions" :key = "option" class = "border-none rounded-none" 
                          :class = "[option === accommodationStore.pagesize ? 'bg-green-400/10' : '']"
                          @click = "updatePageSize(option)">
         {{option}} 
      </DatasetHeaderButton>

    </DatasetHeaderDropDown>


    <p class = "text-sm"> lines per page </p>

    <div class = "flex flex-row items-center">
      <PageSelectButton class = " ml-5 h-6"  
        @update-page-number="updatePageNumber" 
        :page-number="Number(accommodationStore.pagenumber)"
         />
      <p class = "ml-3 text-sm"> of {{ TotalPages }}</p>
    </div>
    

  </div>
</template>

<script setup lang="ts">

  //ICONS

  import DatasetHeaderButton from '@/components/buttons/Button.vue';
  import DatasetHeaderDropDown from '@/components/datasetHeader/DropDownMenu.vue';
  import PageSelectButton from '@/components/footer/pageSelectButton.vue';

  import { computed, watch } from 'vue';
  import { useAccommodationStore } from '@/stores/AccommodationStore';
  import { useRoute, useRouter } from 'vue-router';

  


  const route = useRoute()
  const router = useRouter()
  const accommodationStore = useAccommodationStore()


  const dropdownOptions = [25, 50, 75, 100]

  const TotalPages = computed(() => {
    if (!accommodationStore.pagesize) return 0

    return Math.ceil(accommodationStore.TotalResults / accommodationStore.pagesize)
    
  })

  watch(TotalPages, () => {

    accommodationStore.TotalPages = TotalPages.value
  })
  

  function updatePageSize(option: number){
    accommodationStore.pagesize = option
    accommodationStore.updateAndFetch(router, route)
  }

  function updatePageNumber(pagenumber: number){

    if (isNaN(pagenumber) || pagenumber === null) {
      alert("Insert a valid number")
      return
    }
        
    let newPage = pagenumber

    if (pagenumber > accommodationStore.TotalPages){
        
        newPage = accommodationStore.TotalPages
      
    }
    else if (pagenumber <= 0) {

        newPage = 1

    }


    accommodationStore.pagenumber = newPage
    console.log(accommodationStore.pagenumber)
    accommodationStore.updateAndFetch(router, route)

  }

</script>
