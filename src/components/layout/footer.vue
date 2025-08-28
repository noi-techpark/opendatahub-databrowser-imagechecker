

<template>
  <div class="flex flex-row justify-end items-center space-x-3  w-full h-4 bg-gray-50 p-[18px]    ">

    <p class ="text-sm font-semibold mr-5"> 
      {{ accommodationStore.pagenumber == TotalPages ? accommodationStore.TotalResults % accommodationStore.pagesize : accommodationStore.pagesize}} 
      records out of {{ accommodationStore.TotalResults}} are shown
    </p>


    <DatasetHeaderDropDown :title = "accommodationStore.pagesize.toLocaleString()" width="min-w-14 p-0" arrow-size="size-3" show-down="bottom-full" 
      custom-class-button="h-6" custom-class-content="h-1" class = "text-green-400 text-sm" :button-component="DatasetHeaderButton">

      <DatasetHeaderButton v-for = "option in dropdownOptions" class = "border-none rounded-none" 
                          :class = "[option === accommodationStore.pagesize ? 'bg-green-400/10' : '']"
                          @click = "updatePageSize(option)">
         {{option}} 
      </DatasetHeaderButton>

    </DatasetHeaderDropDown>


    <p class = "text-sm"> lines per page </p>

    <div class = "flex flex-row items-center">
      <PageSelectButton class = " ml-5 h-6"/>
      <p class = "ml-3 text-sm"> of {{ TotalPages }}</p>
    </div>

   
    

  </div>
</template>

<script setup lang="ts">

  //ICONS

  import DatasetHeaderButton from '../datasetHeader/datasetHeaderButton.vue';
  import DatasetHeaderDropDown from '../datasetHeader/datasetHeaderDropDown.vue';
  import PageSelectButton from '../footer/pageSelectButton.vue';
  import { computed } from 'vue';
  import { useAccommodationStore } from '@/stores/AccomodationStore';
  import { useRoute, useRouter } from 'vue-router';



  const route = useRoute()
  const router = useRouter()
  const accommodationStore = useAccommodationStore()


  const dropdownOptions = [25, 50, 75, 100]

  const TotalPages = computed(() => {
    if (!accommodationStore.pagesize) return 0

    return accommodationStore.TotalPages = Math.ceil(accommodationStore.TotalResults / accommodationStore.pagesize)
    
  })
  

  function updatePageSize(option: number){
    accommodationStore.pagesize = option
    accommodationStore.updateAndFetch(router, route)
   
  }

</script>
