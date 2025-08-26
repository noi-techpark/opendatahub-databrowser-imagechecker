<template>

  
  <div class=" max-h-screen h-full  w-full overflow-auto">
   
    

    
    <table class="min-w-full w-full table-auto  border-separate " cellspacing="0" cellpadding="5" >
  
      <TableHeaders></TableHeaders>

      <tbody v-if = "!isLoading && data?.Items?.length">
        <TableRows :data = "data"></TableRows>
      </tbody>

    </table>

    <div v-if="isLoading" class="flex p-4 text-center w-full h-full justify-center items-center">
        <ArrowPathIcon class = "size-36 animate-spin mb-56 mt-32 text-green-400"></ArrowPathIcon>
    </div>

    <div v-if="error" class="flex p-4 text-center w-full h-full justify-center items-center">
        <EyeSlashIcon class = "size-36 animate-bounce mb-56 mt-32  text-green-400"></EyeSlashIcon>
    </div>
    
  
  </div>

  
</template>



<script setup lang="ts">

  //ICONS
  import { ArrowPathIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

  import { onMounted, computed, watch } from 'vue'
  import { useAccommodationStore } from '@/stores/AccomodationStore'
  import { useRoute } from 'vue-router'
  import { useAuth } from '@/auth/authStores/auth'
  import { keycloak } from '@/auth/keycloak'
  import TableRows from './TableRows.vue'
  import TableHeaders from './TableHeaders.vue'

  
  import { useAccommodationsQuery } from '@/composable/useAccomodationsQuery'
  


  const route = useRoute()
 
  const accommodationStore: any = useAccommodationStore()

  const auth = useAuth()
  

  //INITIAL FETCH //TODOO this is the initial fetch that happens after every reload, might be good to put it in a place that makes more sense, like accommodationStore
  onMounted(() => {
      const savedToken = localStorage.getItem('kc_token')
      if (savedToken) {
        auth.authenticate(savedToken)
        keycloak.token = savedToken
      }

      accommodationStore.restoreFromUrl(route);
  });


  accommodationStore.restoreFromUrl(route);
  const {isLoading, data, error} = useAccommodationsQuery()


  watch(data, () => {

    if(accommodationStore.FirstTotalResults == 0){
      const FirstTotalResults = data.value.TotalResults
      accommodationStore.FirstTotalResults = FirstTotalResults
    }

    const totalResults = computed(() => data.value?.TotalResults ?? 0)
    accommodationStore.TotalResults = totalResults.value

    
  }) 
  





</script>




<style scoped>
  table, th, td, tr {
    @apply border-[1px]
  }
</style>


