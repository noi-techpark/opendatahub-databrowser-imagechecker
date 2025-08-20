<template>

  <div class="flex flex-col items-center p-2 space-y-3 " v-for = "(filter, index) in accommodationStore.filters" :key="index">


    <div class= " w-full flex justify-end">
    <button @click = "accommodationStore.removeFilter(index, router, route)" class= " w-8 flex justify-end">
      <XCircleIcon class = "size-6 text-red-500 mr-1"></XCircleIcon>
    </button>
    </div>

    <div class="flex space-x-2 w-full h-auto" > 

      <DatasetHeaderDropDown
        :ref ="el => dropdownRef1[index] = el"
        :title="filterTypesMap[filter.type] || filter.type"
        width="min-w-36"
        class="w-auto whitespace-break-spaces min-w- "
      >
          <DatasetHeaderButton
            v-for="(label, key) in filterTypesMap"
            :key="key"
            @click="selectType(key, index)"
            :class="[
              'hover:bg-green-400/10 cursor-pointer border-none m-0 rounded-none z-50 whitespace-nowrap',
              filter.type === key ? 'bg-green-400/10' : ''
            ]"
          >
   
              {{ label }}
           
          </DatasetHeaderButton>

      </DatasetHeaderDropDown>

      <DatasetHeaderDropDown
        :ref ="el => dropdownRef2[index] = el"
        :title="filterComparison[filter.comparison] || filter.comparison"
        width="min-w-36"
        class="w-auto "
      >
        <DatasetHeaderButton
          v-for="(label, key) in filterComparison"
          :key="key"
          @click="selectComparison(key, index)"
          :class="[
            'hover:bg-green-100 cursor-pointer border-none m-0 rounded-none',
            accommodationStore.filters[index].comparison === label ? 'bg-green-400/10' : ''
          ]"
        >
          {{ label }}
        </DatasetHeaderButton>
      </DatasetHeaderDropDown>
    </div>

   
    
    <div class="w-full" v-if = "!(filter.comparison === 'isnull' || filter.comparison === 'isnotnull')">
      <DatasetHeaderButton class="w-full p-0">
        <input
          class="w-full border-none bg-transparent px-2 py-1 focus:outline-none"
          placeholder="insert search value"
          type="text" v-model = "accommodationStore.filters[index].value"
          @keyup.enter = "handleSearch()"
        />
      </DatasetHeaderButton>
    </div>

    
    
  </div>
    <ContentDivider class = "mt-3"></ContentDivider> <!--TODOO make the divider appear betweeen each Filter-->


    

    <div class = "flex flex-row">
        <DatasetHeaderButton class ="w-28 h-8  m-4 bg-green-400 flex items-center hover:bg-green-700" @click = "handleSearch()">
          <FunnelIcon class="text-white size-6"></FunnelIcon>
            <p class = "text-white">filter</p>
        </DatasetHeaderButton>

        <DatasetHeaderButton class ="w-60 h-8 m-4 flex items-center border-green-400 border-2" @click = "accommodationStore.addFilter()">
            <PlusIcon class = "text-green-400 size-6"></PlusIcon>
            <p class = " text-green-400"> Add a new filter</p>
        </DatasetHeaderButton>
    </div>

</template>



<script setup lang = "ts">

  //ICONS
  import { FunnelIcon, XCircleIcon } from '@heroicons/vue/24/outline'; 
  import { PlusIcon } from '@heroicons/vue/16/solid';


  import DatasetHeaderButton from '../datasetHeaderButton.vue';
  import DatasetHeaderDropDown from '../datasetHeaderDropDown.vue';
  import ContentDivider from '@/components/contentAlignment/ContentDivider.vue'; 
  import { ref, computed, watch } from 'vue';
  import { useLanguageStore } from '@/stores/HeaderTableStore';

  import { useAccommodationStore } from '@/stores/AccomodationStore';
  import { useFooterStore } from '@/stores/FooterStore';
  import { useRoute, useRouter } from 'vue-router';


  const accommodationStore = useAccommodationStore()
  const footerStore = useFooterStore()
  const languageStore = useLanguageStore()

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
    [`AccoDetail.${languageStore.language.toLowerCase()}.Name`]: "Title",
    AccoTypeId: "Accommodation Type",
    AccoCategoryId: "Category",
    [`LocationInfo.RegionInfo.Name.${languageStore.language.toLowerCase()}`]: "Region",
    HasLanguage: "Languages",
    [`ImageGallery.0.ImageUrl`]: "Image",
    [`LocationInfo.MunicipalityInfo.Name.${languageStore.language.toLowerCase()}`]: "Municipality",
    BadgeIds: "Badges",
    ThemeIds: "Themes",
    SmgTags: "Tags",
    LastChange: "Edited on",
    Source: "Source",
    Active: "Source State",
    PublishedOn: "Published On"
    //TODOO, missing Push Data Filter
  }));







  function selectType(typeKey: string, index: number) {
    accommodationStore.filters[index].type = typeKey;
    dropdownRef1.value[index]?.close?.();   //close function comes from emit in DatasetHeaderDropDown
    }


  function selectComparison(comparison: string, index: number) {
    accommodationStore.filters[index].comparison = comparison;
    dropdownRef2.value[index]?.close?.();
    }

  function handleSearch() {
    footerStore.pagenumber = 1
    accommodationStore.updateAndFetch(router, route)
    }



  // Watch for changes in the language selected and update filter types accordingly (this way, filters look for the values in the language selected)
  const languageDependentKeys = [
    "AccoDetail",
    "LocationInfo.RegionInfo.Name",
    "LocationInfo.MunicipalityInfo.Name"
  ]

  watch(
    () => languageStore.language,
    (newLang) => {
      accommodationStore.filters.forEach((filter) => {
        
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


</script>