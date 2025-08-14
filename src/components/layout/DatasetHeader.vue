<template>
  <div class="flex flex-row flex-wrap z-30 bg-white items-center p-1 justify-between">

    <div class = "flex flex-row space-x-2 items-center flex-wrap">

    <DatasetHeaderDropDown title="Accomodation" :bold="true" width="min-w-52">
      
       <DatasetHeaderButton>opzione 1</DatasetHeaderButton>            <!--TODO, add list of options  (where can i fetch them? ASK)-->
       <DatasetHeaderButton>opzione 2</DatasetHeaderButton>
    </DatasetHeaderDropDown>

    <DatasetHeaderButton @click = "showInfo = !showInfo" class ="relative"> 
      <InformationCircleIcon class= "size-6 text-green-400"></InformationCircleIcon>

      <div v-if="showInfo" class =  " absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded shadow-lg h-64 w-64 z-50">  <!--TODOO-->
        <CardContainer > 
          INFO SUL DATASET  
        </CardContainer>
      </div>
    </DatasetHeaderButton>

    <!--SearchBar-->
    <DatasetHeaderSearchBar></DatasetHeaderSearchBar>
    
    <DatasetHeaderButton @click = "AccomodatioStore.showFilterSideBar = !AccomodatioStore.showFilterSideBar"
                          :class = "AccomodatioStore.showFilterSideBar ?  ' bg-green-400/10 border-green-400': ''"> 
        <Bars3BottomRightIcon class = "size-6 text-green-400 "></Bars3BottomRightIcon>
        <p>Filters</p>
    </DatasetHeaderButton>

    <DatasetHeaderDropDown :title="selectedLanguage.language" width="min-w-24" >
      <template #icon>
        <GlobeEuropeAfricaIcon class = "size-6 text-green-400"></GlobeEuropeAfricaIcon>
      </template>
  
      <DatasetHeaderButton v-for = "language in Languages" :key="language"
                          @click = "changeLanguage(language)"
                          :class="[
                            'hover:bg-green-400/10 cursor-pointer border-none m-0 rounded-none',
                            selectedLanguage.language === language ? 'bg-green-400/10' : ''
                          ]"
      >
      {{ language }}
      </DatasetHeaderButton> 
        
    </DatasetHeaderDropDown>

     <DatasetHeaderDropDown title="View" width="min-w-24">
      <template #icon>
        <CircleStackIcon class = "size-6 text-green-400"></CircleStackIcon>
      </template>
       <DatasetHeaderButton>opzione </DatasetHeaderButton>
    </DatasetHeaderDropDown>


    <DatasetHeaderButton> 
      <Bars3Icon class= "size-6 text-green-400 rotate-90"></Bars3Icon>
      <p> Attributes </p> 
    </DatasetHeaderButton>
    </div>

    <div class = "ml-auto flex items-center mr-3 space-x-3">

      <DatasetHeaderButton> 
        <PlusCircleIcon class = "size-6 text-green-400"></PlusCircleIcon>

        <p> Add a record </p> 
      </DatasetHeaderButton>

      <DatasetHeaderButton> 
        <ArrowDownOnSquareIcon class="size-6 text-green-400"></ArrowDownOnSquareIcon>

        <p> Export </p> 
      </DatasetHeaderButton>

      <DatasetHeaderButton> 
        <CursorArrowRaysIcon class="size-6 text-green-400"></CursorArrowRaysIcon>

        <p> Actions </p> 
      </DatasetHeaderButton>
    
    </div>

  </div>


</template>

<script setup lang="ts">

//ICONS
  import { InformationCircleIcon, Bars3BottomRightIcon, GlobeEuropeAfricaIcon, CircleStackIcon, 
    Bars3Icon, PlusCircleIcon, ArrowDownOnSquareIcon, CursorArrowRaysIcon } from '@heroicons/vue/24/outline';  


  import { ref } from 'vue';
  import DatasetHeaderButton from '../datasetHeader/datasetHeaderButton.vue';
  import DatasetHeaderDropDown from '../datasetHeader/datasetHeaderDropDown.vue';
  import DatasetHeaderSearchBar from '../datasetHeader/datasetHeaderSearchBar.vue';
  import { useLanguageStore } from '@/stores/HeaderTableStore';
  import CardContainer from '../card/CardContainer.vue';
  import { useAccommodationStore } from '@/stores/AccomodatioStore';
  import { useRoute, useRouter } from 'vue-router';
  const Languages = ["DE", "IT", "EN", "NL", "CS", "PL", "FR", "RU", "LD"];
  const selectedLanguage = useLanguageStore();
  const AccomodatioStore = useAccommodationStore()
  const route = useRoute()
  const router = useRouter()

  const showInfo = ref(false);
  


  function changeLanguage(language: string){
    selectedLanguage.language = language
    console.log(selectedLanguage.language)
    AccomodatioStore.updateAndFetch(router, route)
  }


</script>
