<template>

  <div class="flex flex-col items-center p-3 space-y-3 " v-for = "(filter, index) in accommodationStore.filtersRef" :key="index">


    <div class= " w-full flex justify-end">
    <button @click = "removeFilter(index)" class= " w-8 flex justify-end">
      <XCircleIcon class = "size-6 text-red-500 mr-1"></XCircleIcon>
    </button>
    </div>

    <div class="flex space-x-2 w-full h-auto" > 

      <DatasetHeaderDropDown
        :ref ="el => dropdownRef1[index] = el"
        :title="filterTypesMap[filter.type] || filter.type"
        class="w-full whitespace-break-spaces "
        :button-component="FilterButton"
     
      >
          <FilterButton
            v-for="(label, key) in filterTypesMap" :key="key" @click="selectType(key, index)"
            :class="[
              'hover:bg-green-400/10 cursor-pointer border-none m-0 rounded-none z-50 whitespace-nowrap text-gray-600',
              filter.type === key ? 'bg-green-400/10' : ''
            ]"
          >
   
              {{ label }}
           
          </FilterButton>

      </DatasetHeaderDropDown>

      <DatasetHeaderDropDown
        :ref ="el => dropdownRef2[index] = el"
        :title="filterComparison[filter.comparison] || filter.comparison"
        class="w-full "
        :button-component="FilterButton"
      >
        <FilterButton
          v-for="(label, key) in filterComparison" :key="key" @click="selectComparison(key, index)"
          :class="[
            'hover:bg-green-100 cursor-pointer border-none m-0 rounded-none  text-gray-600',
            accommodationStore.filtersRef[index].comparison === label ? 'bg-green-400/10' : ''
          ]"
        >
          {{ label }}
        </FilterButton>
      </DatasetHeaderDropDown>
    </div>

   
    
    <div class="w-full" v-if = "!(filter.comparison === 'isnull' || filter.comparison === 'isnotnull')">
      <FilterButton class="w-full p-0 h-10">
        <input
          class="w-full border-none bg-transparent px-2 py-1 focus:outline-none h-5 text-gray-800"
          placeholder="insert search value"
          type="text" v-model = "accommodationStore.filtersRef[index].value"
          @keyup.enter = "handleSearch()"
        />
      </FilterButton>
    </div>

    <ContentDivider></ContentDivider>
    
  </div>
    


    <div class = "flex flex-row "> 
        <FilterButton class ="w-1/3  m-3 bg-green-400 flex items-center hover:bg-green-700 " @click = "handleSearch()">
          <FunnelIcon class="text-white size-4"></FunnelIcon>
            <p class = "text-white text-xs">filter</p>
        </FilterButton>

        <FilterButton class ="w-2/3  m-3 flex items-center border-green-400 border-2 " @click = "addFilterRef()">
            <PlusIcon class = "text-green-400 size-4"></PlusIcon>
            <p class = " text-green-400 font-bold text-xs"> Add a new filter</p>
        </FilterButton>
    </div>

</template>



<script setup lang = "ts">

  //ICONS
  import { FunnelIcon, XCircleIcon } from '@heroicons/vue/24/outline'; 
  import { PlusIcon } from '@heroicons/vue/16/solid';

  import DatasetHeaderDropDown from '../datasetHeaderDropDown.vue';
  import ContentDivider from '@/components/contentAlignment/ContentDivider.vue'; 
  import FilterButton from './filterButton.vue';

  import { ref, computed, watch } from 'vue';


  import { useAccommodationStore } from '@/stores/AccomodationStore';

  import { useRoute, useRouter } from 'vue-router';


  const accommodationStore = useAccommodationStore()

  
  accommodationStore.filtersRef = ([
    ...accommodationStore.filtersRef,
    ... accommodationStore.filters
  ])

  const router = useRouter()
  const route = useRoute()

  const dropdownRef1 = ref<any[]>([]);
  const dropdownRef2 = ref<any[]>([]);


  const filterComparison =  <Record<string, string>>{
    "eq": "equal to",
    "ne": "not equal to",
    "gt": "greater than",
    "ge": "greater or equal",
    "lt": "less than",
    "le": "less or equal",
    "like": "like",
    "isnull": "is null",
    "isnotnull": "is not null",
    "in": "includes",
    "nin": "not includes",
    "likein": "likein"
  };


  const filterTypesMap = computed<Record<string, string>>(() => ({
    [`AccoDetail.${accommodationStore.language.toLowerCase()}.Name`]: "Title",
    AccoTypeId: "Accommodation Type",
    AccoCategoryId: "Category",
    [`LocationInfo.RegionInfo.Name.${accommodationStore.language.toLowerCase()}`]: "Region",
    HasLanguage: "Languages",
    [`ImageGallery.0.ImageUrl`]: "Image",
    [`LocationInfo.MunicipalityInfo.Name.${accommodationStore.language.toLowerCase()}`]: "Municipality",
    AccoBadges: "Badges",
    AccoThemes: "Themes",
    ODHTags: "Tags",
    "_Meta.LastUpdate": "Edited on",
    "_Meta.Source": "Source",
    Active: "Source State",
    PublishedOn: "Published On"

    //TODOO, missing Push Data Filter
  }));







  function selectType(typeKey: string, index: number) {

    accommodationStore.filtersRef[index].type = typeKey
    //accommodationStore.filters[index].type = typeKey;
    dropdownRef1.value[index]?.close?.();   //close function comes from emit in DatasetHeaderDropDown
    }


  function selectComparison(comparison: string, index: number) {
    accommodationStore.filtersRef[index].comparison = comparison
    //accommodationStore.filters[index].comparison = comparison;
    dropdownRef2.value[index]?.close?.();
    }

  function handleSearch() {
    accommodationStore.filters = JSON.parse(JSON.stringify(accommodationStore.filtersRef))
    accommodationStore.pagenumber = 1
    accommodationStore.updateAndFetch(router, route)
    }

  function addFilterRef(){
    accommodationStore.filtersRef = [...accommodationStore.filtersRef,
      {
          type: `AccoDetail.${accommodationStore.language.toLowerCase()}.Name`,
          comparison: "like",
          value: "",
      }
    ]
  }

  function removeFilter(index: number){
    accommodationStore.removeFilter(index, router, route)
    accommodationStore.filtersRef.splice(index, 1)
  }


  // Watch for changes in the language selected and update filter types accordingly (this way, filters look for the values in the language selected)
  const languageDependentKeys = [
    "AccoDetail",
    "LocationInfo.RegionInfo.Name",
    "LocationInfo.MunicipalityInfo.Name"
  ]

  watch(
    () => accommodationStore.language,
    (newLang) => {
      accommodationStore.filtersRef.forEach((filter) => {
        
        for (const baseKey of languageDependentKeys) {
          if (filter.type.startsWith(baseKey)) {
            if(baseKey === "AccoDetail") {
              filter.type = `${baseKey}.${newLang.toLowerCase()}.Name`
            } else {
              filter.type = `${baseKey}.${newLang.toLowerCase()}`;
            }
            
          }
        }
      })
    }
  )

  defineExpose({
    resetfiltersRef: () => { accommodationStore.filtersRef = []}
  })


</script>