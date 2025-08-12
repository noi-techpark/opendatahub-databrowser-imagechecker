<template>

  <AppLayout>
    <ContentDivider />

    <div class="flex flex-col h-full">
    
        <DatasetHeader class = "sticky top-0 bg-white"/>

        <div class="flex flex-row">
          <div class="flex-1 overflow-auto ">  <!-- TODO, SCROLLBAR HIDE IS A TEMPORARY FIX-->
            <slot></slot>
          </div>
          


          <FiltersSideBar v-if = "filter.showFilterSideBar" class =" min-w-96"></FiltersSideBar>

        </div>
      
    </div>
  </AppLayout>
  
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import ContentDivider from '@/components/contentAlignment/ContentDivider.vue'
import DatasetHeader from '@/components/layout/DatasetHeader.vue'
import FiltersSideBar from '../datasetHeader/filter/filtersSideBar.vue'



import { useFilterStore } from '@/stores/HeaderTableStore'
const filter = useFilterStore()
</script>
