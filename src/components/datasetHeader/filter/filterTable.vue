<template>

  <div class="flex flex-col items-center p-3 space-y-3 " v-for = "(filter, index) in filterStore.filters" :key="index">


    <button @click = "filterStore.removeFilter(index)">remove</button>
    <div class="flex space-x-2 w-full" > 
      <DatasetHeaderDropDown
        :ref ="el => dropdownRef1[index] = el"
        :title="filterStore.filters[index].type"
        width="min-w-24"
        class="w-1/2 "
      >
        <DatasetHeaderButton
          v-for="type in filterTypes"
          :key="type"
          @click="selectType(type, index)"
          :class="[
            'hover:bg-green-100 cursor-pointer border-none m-0 rounded-none z-50',
            filterStore.filters[index].type === type ? 'bg-green-200' : ''
          ]"
        >
          {{ type }}
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
 import { ref } from 'vue';
import { useFilterStore } from '@/stores/HeaderTableStore';
import { useSearchStore } from '@/stores/HeaderTableStore';


const dropdownRef1 = ref<any[]>([]);
const dropdownRef2 = ref<any[]>([]);


 const filterComparison = ["equal to", "not equal to", "like", "greater than", "greater or equal", "less than", "less or equal", "is null", "is not null",
    "includes", "not includes", "likein"
 ]



const filterTypes = ["Shortname", "AccoTypeId"]

 const filterStore = useFilterStore();
 const searchStore = useSearchStore();

  // Function to select a type from the dropdown

function selectType(type: string, index: number) {
  filterStore.filters[index].type = type;
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



  

</script>