<template>

  <AppLayout>
 

    <div class="flex flex-col h-full">
    
        <DatasetHeader class = "sticky top-0 bg-white"/>

        <div class="flex flex-row overflow-auto">   <!-- REMINDER This overflow-auto wasted 10 hours of my time-->

          <div class="flex-1 overflow-auto">    <!--displays TableView-->
            <slot></slot>
          </div>

          <FiltersSideBar v-if = "accommodationStore.showFilterSideBar" class =" w-96 overflow-auto "></FiltersSideBar>

        </div>
      
    </div>

  </AppLayout>
  
</template>

<script setup lang="ts">
  import AppLayout from '@/components/layout/AppLayout.vue'
  import DatasetHeader from '@/components/layout/DatasetHeader.vue'
  import FiltersSideBar from '../datasetHeader/filter/filtersSideBar.vue'
  import { useAccommodationStore } from '@/stores/AccomodationStore'

  const accommodationStore = useAccommodationStore()

</script>
