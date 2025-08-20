<template>
    <div class = " left-0 bg-gray-50 w-52 border z-5 shadow-[inset_8px_0_8px_-8px_rgba(0,0,0,0.1)]">
     
            <div class =" h-[70px] bg-gray-250 border rounded justify-between items-center flex space-x-2"> 
                
                <Bars3BottomRightIcon class = "size-6 text-green-400 ml-5"></Bars3BottomRightIcon>

                <b class = "text-xl">Filters</b>

                <DatasetHeaderButton @click = "accomodationStore.showFilterSideBar = false">
                    <XMarkIcon class = "ml-auto size-6 text-green-400"></XMarkIcon>
                </DatasetHeaderButton>
            </div>
          


            <div class = "flex flex-row items-center p-1 mt-5">

                <p class ="ml-5 text-sm"> 
                    <b>{{ footerStore.TotalResults }}</b>
                     <span class="text-gray-500"> records out of </span> 
                    <b> {{ footerStore.FirstTotalResults }}</b>
                
                </p>

                <DatasetHeaderButton  class = "ml-auto mr-4 text-sm flex items-center h-6 " @click = removeFiltersAndUpdate()>
                    <XCircleIcon class="text-red-500 size-5"></XCircleIcon>
                    <p class = " text-green-400"> Reset all Filters</p>
                </DatasetHeaderButton>

            </div>




            <div class ="bg-white m-4 border rounded max-h-screen overflow-y-auto"> 
                <FilterTable></FilterTable>
            </div>
    </div>

</template>

<script setup lang="ts">

    //ICONS
    import { XCircleIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/vue/16/solid';

    import DatasetHeaderButton from '../datasetHeaderButton.vue';
    import FilterTable from './filterTable.vue';
    import { useAccommodationStore } from '@/stores/AccomodationStore';
    import { useRoute, useRouter } from 'vue-router';
    import { useFooterStore } from '@/stores/FooterStore';

    const route = useRoute()
    const router = useRouter()

    const accomodationStore = useAccommodationStore()
    const footerStore = useFooterStore()

    function removeFiltersAndUpdate() {
        accomodationStore.filters = []
        accomodationStore.updateAndFetch(router, route)
    }

</script>