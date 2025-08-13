<template>
  <div class="flex flex-row flex-wrap z-30 bg-white items-center p-1 justify-between">

    <div class = "flex flex-row space-x-2 items-center flex-wrap">

    <DatasetHeaderDropDown title="Accomodation" :bold="true" width="min-w-52">
      
       <DatasetHeaderButton>opzione 1</DatasetHeaderButton>            <!--TODO, add list of options  (where can i fetch them? ASK)-->
       <DatasetHeaderButton>opzione 2</DatasetHeaderButton>
    </DatasetHeaderDropDown>

    <DatasetHeaderButton @click = "showInfo = !showInfo" class ="relative"> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>

      <div v-if="showInfo" class =  " absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded shadow-lg h-64 w-64 z-50">  <!--TODOO-->
        <CardContainer > 
          INFO SUL DATASET  
        </CardContainer>
      </div>
    </DatasetHeaderButton>

    <!--SearchBar-->
    <DatasetHeaderSearchBar></DatasetHeaderSearchBar>
    
    <DatasetHeaderButton @click = "AccomodatioStore.showFilterSideBar = !AccomodatioStore.showFilterSideBar, console.log(AccomodatioStore.showFilterSideBar)"> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
        </svg>

        <p>Filters</p>
    </DatasetHeaderButton>

    <DatasetHeaderDropDown :title="selectedLanguage.language" width="min-w-24" >
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
        </svg>

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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      </template>
       <DatasetHeaderButton>opzione </DatasetHeaderButton>
    </DatasetHeaderDropDown>


    <DatasetHeaderButton> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 rotate-90 text-green-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <p> Attributes </p> 
    </DatasetHeaderButton>
    </div>

    <div class = "ml-auto flex items-center mr-3">
    <DatasetHeaderButton> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>

      <p> Add a record </p> 
    </DatasetHeaderButton>
      </div>

  </div>


</template>

<script setup lang="ts">
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
