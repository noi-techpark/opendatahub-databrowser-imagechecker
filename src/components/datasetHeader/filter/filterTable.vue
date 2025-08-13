<template>

  <div class="flex flex-col items-center p-3 space-y-3 " v-for = "(filter, index) in filterStore.filters" :key="index">


    <button @click = "filterStore.removeFilter(index)">remove</button>
    <div class="flex space-x-2 w-full" > 

      <DatasetHeaderDropDown
        :ref ="el => dropdownRef1[index] = el"
        :title="filterTypesMap[filter.type] || filter.type"
        width="min-w-24"
        class="w-1/2 "
      >
          <DatasetHeaderButton
            v-for="(label, key) in filterTypesMap"
            :key="key"
            @click="selectType(key, index)"
            :class="[
              'hover:bg-green-100 cursor-pointer border-none m-0 rounded-none z-50 whitespace-nowrap',
              filter.type === key ? 'bg-green-200' : ''
            ]"
          >
            {{ label }}
          </DatasetHeaderButton>

      </DatasetHeaderDropDown>

      <DatasetHeaderDropDown
        :ref ="el => dropdownRef2[index] = el"
        :title="filterStore.filters[index].comparison"
        width="min-w-24"
        class="w-1/2"
      >
        <DatasetHeaderButton
          v-for="comparison in filterComparison"
          :key="comparison"
          @click="selectComparison(comparison, index)"
          :class="[
            'hover:bg-green-100 cursor-pointer border-none m-0 rounded-none',
            filterStore.filters[index].comparison === comparison ? 'bg-green-200' : ''
          ]"
        >
          {{ comparison }}
        </DatasetHeaderButton>
      </DatasetHeaderDropDown>
    </div>

   
    
    <div class="w-full ">
      <DatasetHeaderButton class="w-full p-0">
        <input
          class="w-full border-none bg-transparent px-2 py-1 focus:outline-none"
          placeholder="insert search value"
          type="text" v-model = "filterStore.filters[index].value"
        />
      </DatasetHeaderButton>
    </div>

    

  </div>

  <ContentDivider></ContentDivider>

    

    <div class = "flex flex-row">
        <DatasetHeaderButton class ="w-40  m-4" @click = "applyFiltersAndUpdateTable()">
            <p>filter</p>
        </DatasetHeaderButton>

        <DatasetHeaderButton class ="w-60 m-4" @click = "filterStore.addFilter()">
            <p>+ Add a new filter</p>
        </DatasetHeaderButton>
    </div>

</template>

<script setup lang = "ts">
 import DatasetHeaderButton from '../datasetHeaderButton.vue';
 import DatasetHeaderDropDown from '../datasetHeaderDropDown.vue';
 import ContentDivider from '@/components/contentAlignment/ContentDivider.vue';
 import { ref, computed, watch } from 'vue';
import { useFilterStore } from '@/stores/HeaderTableStore';
import { useSearchStore } from '@/stores/HeaderTableStore';
import { useLanguageStore } from '@/stores/HeaderTableStore';
import { useRoute, useRouter } from 'vue-router';


const dropdownRef1 = ref<any[]>([]);
const dropdownRef2 = ref<any[]>([]);
const languageStore = useLanguageStore()
 const filterStore = useFilterStore();
 const searchStore = useSearchStore();

  const router = useRouter();
  const route = useRoute();

 const filterComparison = ["equal to", "not equal to", "like", "greater than", "greater or equal", "less than", "less or equal", "is null", "is not null",
    "includes", "not includes", "likein"
 ]

const filterTypesMap = computed<Record<string, string>>(() => ({
  [`AccoDetail.${languageStore.language.toLowerCase()}.Name`]: "Title",
  AccoTypeId: "Accommodation Type",
  AccoCategoryId: "Category",
  [`LocationInfo.RegionInfo.Name.${languageStore.language.toLowerCase()}`]: "Region",
  HasLanguage: "Languages",
  [`ImageGallery.0.ImageUrl`]: "Image",
  [`LocationInfo.MunicipalityInfo.Name.${languageStore.language.toLowerCase()}`]: "Municipality",
}));






  // Function to select a type from the dropdown
function selectType(typeKey: string, index: number) {
  filterStore.filters[index].type = typeKey;
  dropdownRef1.value[index]?.close?.();  
  }


function selectComparison(comparison: string, index: number) {
  filterStore.filters[index].comparison = comparison;
  dropdownRef2.value[index]?.close?.();
  }




async function applyFiltersAndUpdateTable() {
    const results = await filterStore.applyFilters();
    
    searchStore.results = results || [];
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
    filterStore.filters.forEach((filter) => {
      // Controlla se il type del filtro inizia con una delle chiavi "dinamiche"
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