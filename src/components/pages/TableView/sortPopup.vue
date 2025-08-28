<template> 
    <div class =  " absolute left-24 top-8
      bg-white border border-gray-300 rounded shadow-lg 
        z-50
        flex flex-col items-start justify-start p-2 space-y-2"> 


            <p class = " text-gray-600 font-bold text-base"> sort</p>

            <div class = "flex flex-row space-x-2 items-center ">
              <DatasetHeaderButton class = "w-full" >
                <label class = "flex flex-row space-x-2 items-center ">
                    <input type="checkbox" name="option1" v-model="ascendingCheck" @change="orderAscending()"></input>
                    <p>Ascending</p>
                    <ChevronDoubleUpIcon class = "size-5 text-green-400"/>
                </label>
              </DatasetHeaderButton>

              <DatasetHeaderButton class = "w-full" >
                <label class="flex flex-row items-center space-x-2">
                    <input type="checkbox" name="option2" v-model="descendingCheck" @change="orderDescending()"></input>
                    <p>Descending</p>
                    <ChevronDoubleDownIcon class = "size-5 text-green-400"/>
                </label>
              </DatasetHeaderButton>
            </div>
            
            <p class = " text-gray-600 font-bold text-base">filter</p>
            <DatasetHeaderButton @click ="addFilter()" class = "w-full"> Add filter </DatasetHeaderButton>

      </div>
</template>


<script setup lang="ts">
    import { ChevronDoubleUpIcon, ChevronDoubleDownIcon } from '@heroicons/vue/24/outline';

    import DatasetHeaderButton from '@/components/datasetHeader/datasetHeaderButton.vue';
    import { useAccommodationStore } from '@/stores/AccomodationStore';
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted, ref } from 'vue';

    const route = useRoute()
    const router = useRouter()
    const accommodationStore = useAccommodationStore()
    
    const ascendingCheck = ref(false)
    const descendingCheck = ref(false)

    onMounted(() => {
    if(String(route.query.rawsort) === props.parameter)
        ascendingCheck.value = true
    if(String(route.query.rawsort) === "-" + props.parameter)
        descendingCheck.value = true

    })

    const props = withDefaults(
    defineProps<{
        parameter?: string
        showSort?: boolean
        isOpen?: boolean
    }>(),
    {
        parameter: '',
        showSort: true,
        isOpen: false
    },
    )

    const emit = defineEmits<{
     (e: "update-sort", payload: { ascending: boolean; descending: boolean; isOpen:boolean }): void
    }>()


    function orderAscending(){
    if (ascendingCheck.value) {
        descendingCheck.value = false
        accommodationStore.rawsort = props.parameter
        accommodationStore.updateAndFetch(router, route)
    } else {
        disableRawSort()
    }
    emit("update-sort", { ascending: ascendingCheck.value, descending: descendingCheck.value, isOpen: true })
    }

    function orderDescending(){
    if(descendingCheck.value){
        ascendingCheck.value = false
        accommodationStore.rawsort = "-" + props.parameter
        accommodationStore.updateAndFetch(router, route)
    } else {
        disableRawSort()
    }
    emit("update-sort", { ascending: ascendingCheck.value, descending: descendingCheck.value, isOpen: true })
    }

    function disableRawSort(){
    accommodationStore.rawsort = ""
    accommodationStore.updateAndFetch(router, route)
    }

    function addFilter(){



        accommodationStore.filtersRef = [
            ...accommodationStore.filtersRef,
            {
                type: props.parameter,
                comparison: "like",
                value: "",
            }
        ]

        accommodationStore.showFilterSideBar = true
        emit("update-sort", {ascending: ascendingCheck.value, descending: descendingCheck.value, isOpen: false})
    }


</script>