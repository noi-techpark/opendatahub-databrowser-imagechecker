<template>
  <div class="flex flex-row flex-wrap gap-x-3 gap-y-2 z-30 items-center justify-between p-2 bg-white ">

    <div class = "flex flex-row items-center justify-center flex-wrap ml-3 space-x-2">

      <DatasetHeaderDropDown :title="selectedQuickFilter" :bold="true"  arrow-size="size-4" :button-component="DatasetHeaderButton">
        
        <FilterButton v-for = "(label, key) in typeFilters" @click = " handleFilter(label, key)" 
        class ="border-none rounded-none" :class = "selectedQuickFilter === key ? 'bg-green-400/10' : '' "
        >
          {{ key }}
        </FilterButton>            <!--TODO, add list of options  (where can i fetch them? ASK)-->
        
      </DatasetHeaderDropDown>


      <DatasetHeaderButton @click = "showInfo = !showInfo" class ="relative flex items-center "> 
        <InformationCircleIcon class= "size-5 text-green-400"></InformationCircleIcon>

        <div v-if="showInfo" class =  " absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded shadow-lg h-64 w-64 z-50">  <!--TODOO-->
          <CardContainer > 
            INFO SUL DATASET  
          </CardContainer>
        </div>

      </DatasetHeaderButton>

      <!--SearchBar, TODOO its, margin controls the h of the dsh-->
      <DatasetHeaderSearchBar class ="w-60"/>
      

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

      <DatasetHeaderDropDown title="View" :button-component="DatasetHeaderButton" arrow-size=" size-4">
        <template #icon>
          <CircleStackIcon class = "size-5 text-green-400"></CircleStackIcon>
        </template>
        <DatasetHeaderButton>options </DatasetHeaderButton>
      </DatasetHeaderDropDown>


      <DatasetHeaderButton> 
        <Bars3Icon class= "size-5 text-green-400 rotate-90"></Bars3Icon>
        <p> Attributes </p> 
      </DatasetHeaderButton>

    </div>

    <div class = "ml-auto flex items-center mr-3 space-x-3">

      <DatasetHeaderButton> 
        <PlusCircleIcon class = "size-5 text-green-400"></PlusCircleIcon>
        <p> Add record </p> 
      </DatasetHeaderButton>

      <ExportCSV/>

      <DatasetHeaderButton> 
        <CursorArrowRaysIcon class="size-5 text-green-400"></CursorArrowRaysIcon>
        <p> Actions </p> 
      </DatasetHeaderButton>
    
    </div>

  </div>


</template>

<script setup lang="ts">

//ICONS
  import { InformationCircleIcon, Bars3BottomRightIcon, GlobeEuropeAfricaIcon, CircleStackIcon, 
    Bars3Icon, PlusCircleIcon, CursorArrowRaysIcon } from '@heroicons/vue/24/outline';  

  import DatasetHeaderButton from '../datasetHeader/datasetHeaderButton.vue';
  import DatasetHeaderDropDown from '../datasetHeader/datasetHeaderDropDown.vue';
  import DatasetHeaderSearchBar from '../datasetHeader/datasetHeaderSearchBar.vue';
  import CardContainer from '../card/CardContainer.vue';
  import ExportCSV from '../datasetHeader/export/exportCSV.vue'

  import { ref } from 'vue';
  import { useAccommodationStore } from '@/stores/AccomodationStore';

  import { useRoute, useRouter } from 'vue-router';
import FilterButton from '../datasetHeader/filter/filterButton.vue';

  
  const Languages = ["DE", "IT", "EN", "NL", "CS", "PL", "FR", "RU", "LD"];
  const AccomodatioStore = useAccommodationStore()
  const route = useRoute()
  const router = useRouter()
  
  const showInfo = ref(false);
  const selectedQuickFilter = ref("Accommodation")


  function changeLanguage(language: string){
    AccomodatioStore.language = language
    AccomodatioStore.updateAndFetch(router, route)
  }


  const typeFilters: Record<string, string> = {
    "Accommodation": "",
    "Accommodation HotelPension": "1",
    "Accommodation Mountain": "32"
  }
  

  function handleFilter(typefilterLabel : string, typefilterKey : string){
    AccomodatioStore.filters = [ ]
    AccomodatioStore.typefilter = typefilterLabel
    selectedQuickFilter.value = typefilterKey
    AccomodatioStore.updateAndFetch(router, route)
  }

</script>
