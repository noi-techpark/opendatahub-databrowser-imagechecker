<template>
  <div class="flex flex-row space-x-2 z-30 bg-white">

    <DatasetHeaderDropDown title="Accomodation" :bold="true" width="min-w-52">
      
       <DatasetHeaderButton>opzione 1</DatasetHeaderButton>            <!--TODO, add list of options  (where can i fetch them? ASK)-->
       <DatasetHeaderButton>opzione 2</DatasetHeaderButton>
    </DatasetHeaderDropDown>

    <DatasetHeaderButton @click = "showInfo = !showInfo" class ="relative"> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>

      <div v-if="showInfo" class =  " absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded shadow-lg h-64 w-64 z-50">  <!--position Absolute is temporary, it should stick to the bottom of the datasetHeader -->
        <CardContainer > 
          INFO SUL DATASET  
        </CardContainer>
      </div>
    </DatasetHeaderButton>

    <!--SearchBar-->
    <DatasetHeaderSearchBar></DatasetHeaderSearchBar>
    
    <DatasetHeaderButton @click = "AccomodatioStore.showFilterSideBar = !AccomodatioStore.showFilterSideBar, console.log(AccomodatioStore.showFilterSideBar)"> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>
        <p>Filters</p>
    </DatasetHeaderButton>

    <DatasetHeaderDropDown :title="selectedLanguage.language" width="min-w-24">
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      </template>
      
      <DatasetHeaderButton v-for = "language in Languages" :key="language"
                          @click = "selectedLanguage.language = language"
                          :class="[
                            'hover:bg-green-100 cursor-pointer border-none m-0 rounded-none',
                            selectedLanguage.language === language ? 'bg-green-200' : ''
                          ]"
      >
      {{ language }}
      </DatasetHeaderButton>            
      
    </DatasetHeaderDropDown>

     <DatasetHeaderDropDown title="View" width="min-w-24">
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      </template>
       <DatasetHeaderButton>opzione </DatasetHeaderButton>
    </DatasetHeaderDropDown>


    <DatasetHeaderButton> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 rotate-90">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <p> Attributes </p> 
    </DatasetHeaderButton>

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
  const Languages = ["DE", "IT", "EN", "NL", "CS", "PL", "FR", "RU", "LD"];
  const selectedLanguage = useLanguageStore();
  const AccomodatioStore = useAccommodationStore()

  const showInfo = ref(false);



</script>
