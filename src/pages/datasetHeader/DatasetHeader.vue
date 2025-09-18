<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-row flex-wrap gap-x-3 gap-y-2 z-30 items-center justify-between p-2 bg-white ">

    <div class = "flex flex-row items-center justify-center flex-wrap ml-3 space-x-2 gap-y-2">

      <DatasetHeaderDropDown :title="typeFilters[typeFilterRef]" :bold="true"  arrow-size="size-4" :button-component="DatasetHeaderButton" class ="min-w-44">
        
        <FilterButton 
          v-for = "(key) in typeFiltersOrder" 
          :key = "key" 
          @click = " handleFilter(key, typeFilters[key])" 
         class ="border-none rounded-none" :class = "typeFilterRef === key ? 'bg-green-400/10' : '' "
        >
          {{ typeFilters[key] }}
        </FilterButton>            
        
      </DatasetHeaderDropDown>

      <div ref ="target" class = "relative">
        <DatasetHeaderButton @click = "showInfo = !showInfo" class ="relative flex items-center"> 
          <InformationCircleIcon class= "size-5 text-green-400"></InformationCircleIcon>
        </DatasetHeaderButton>

        <div v-if="showInfo" class =  " absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded shadow-lg z-50" >  <!--TODOO-->
          <InfoCard @close= "showInfo = false"></InfoCard>

          
        </div>
      </div>
      
      <!--SearchBar, TODOO, it's  margin controls the h of the dsh-->
      <DatasetHeaderSearchBar class ="w-60" @search-value="handleSearch" :queryParam="route.query.searchfilter" id = "search-bar"/>
      

      <DatasetHeaderButton @click = "AccomodatioStore.showFilterSideBar = !AccomodatioStore.showFilterSideBar"
                            :class = "AccomodatioStore.showFilterSideBar ?  ' bg-green-400/10 border-green-400': ''"> 
          <Bars3BottomRightIcon class = "size-5 text-green-400 "></Bars3BottomRightIcon>
          <p>Filters</p>
      </DatasetHeaderButton>

      <DatasetHeaderDropDown :title="AccomodatioStore.language"  :button-component="DatasetHeaderButton" arrow-size=" size-4" >
        <template #icon>
          <GlobeEuropeAfricaIcon class = "size-5 text-green-400"></GlobeEuropeAfricaIcon>
        </template>
    
        <DatasetHeaderButton v-for = "language in Languages" :key="language" @click = "changeLanguage(language)"
                            :class="[
                              'hover:bg-green-400/10 cursor-pointer border-none m-0 rounded-none',
                              AccomodatioStore.language === language ? 'bg-green-400/10' : ''
                            ]">
          {{ language }}
        </DatasetHeaderButton> 
          
      </DatasetHeaderDropDown>






    </div>

    <div class = "ml-auto flex items-center mr-3 space-x-2">

      <DatasetHeaderButton @click ="AccomodatioStore.toggleImageClassification = !AccomodatioStore.toggleImageClassification"
      :class = "AccomodatioStore.toggleImageClassification ?  ' bg-green-400/10 border-green-400': ''"> 
        <SparklesIcon class = "size-5 text-green-400"></SparklesIcon>
        <p>  Image Classification</p> 
      </DatasetHeaderButton>

   

      <ExportCSV/>

      <div ref ="target2" class ="relative">
        <DatasetHeaderButton @click = "showActions = !showActions" > 
          <CursorArrowRaysIcon class="size-5 text-green-400"></CursorArrowRaysIcon>
          <p> Actions </p>    
        </DatasetHeaderButton>

        <div v-if="showActions" class =  " absolute right-0 top-full 
        flex flex-col  items-start space-y-2 mt-2 p-4 z-50 
        rounded shadow-lg text-sm text-gray-600 bg-white border border-gray-300 whitespace-nowrap ">  <!--TODOO-->
            <button @click = "refreshPage()"> Refresh </button>
            <ContentDivider></ContentDivider>
            <button> Force Sync </button>
            <ContentDivider></ContentDivider>
            <button> Push </button>
        </div>
      </div>

    </div>

  </div>


</template>

<script setup lang="ts">

//ICONS
  import { InformationCircleIcon, Bars3BottomRightIcon, GlobeEuropeAfricaIcon, CircleStackIcon, 
    Bars3Icon, CursorArrowRaysIcon, SparklesIcon } from '@heroicons/vue/24/outline';  


  import DatasetHeaderButton from '@/components/buttons/datasetHeaderButton.vue';
  import DatasetHeaderDropDown from '@/components/datasetHeader/DropDownMenu.vue';
  import DatasetHeaderSearchBar from '@/components/datasetHeader/SearchBar.vue';
  import InfoCard from './InfoCard.vue';
  import ExportCSV from '@/pages/export/exportCSV.vue';
  import FilterButton from '@/components/buttons/filterButton.vue';
  import ContentDivider from '@/components/contentAlignment/ContentDivider.vue';

  import { ref, watch } from 'vue';
  import { useAccommodationStore } from '@/stores/AccomodationStore';
  import { useRoute, useRouter } from 'vue-router';
  import { onClickOutside } from '@vueuse/core';




  const target = ref(null)
  const target2 = ref(null)
  
  const AccomodatioStore = useAccommodationStore()
  const route = useRoute()
  const router = useRouter()
  
  const showActions = ref(false)
  const showInfo = ref(false);
  const typeFilterRef = ref("")


    
 

  watch(AccomodatioStore, () => {
     typeFilterRef.value = AccomodatioStore.typefilter
  })

  
  const Languages = ["DE", "IT", "EN", "NL", "CS", "PL", "FR", "RU", "LD"];
  

  const typeFiltersOrder = ["", "1", "64", "2", "4", "8", "16", "32"];
  const typeFilters: Record<string, string> = {
  "": "All Accommodations",
  "1": "HotelPension",
  "2": "BedBreakfast",
  "4": "Farm",
  "8": "Camping",
  "16": "Youth",
  "32": "Mountain",
  "64": "Apartment"
  }

  
  
  function changeLanguage(language: string){
    AccomodatioStore.language = language
    AccomodatioStore.updateAndFetch(router, route)
  }

  function handleFilter(typefilterLabel : string, typefilterKey : string){
    AccomodatioStore.filters = [ ]
    AccomodatioStore.typefilter = typefilterLabel
    typeFilterRef.value = typefilterKey
    AccomodatioStore.updateAndFetch(router, route)
  }

  function handleSearch(value:string) {
    AccomodatioStore.pagenumber = 1
    AccomodatioStore.searchfilter = value
    AccomodatioStore.updateAndFetch(router, route)
  }

  function refreshPage() {
    router
    .push({ path: '/' })
    .then(
      () => window.location.reload()
    )
  }

  onClickOutside(target, () => {
    showInfo.value = false
  })

  onClickOutside(target2, () => {
    showActions.value = false
  })




</script>
