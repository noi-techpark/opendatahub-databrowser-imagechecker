<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>

  
  <div class=" max-h-screen h-full  w-full overflow-auto">
   
    

    <table class="min-w-full w-full table-auto  border-separate " cellspacing="0" cellpadding="5" >
  
      <TableHeaders :column-data = "headerColumns"></TableHeaders>

      <tbody v-if = "!isLoading && data?.Items?.length">
        <TableRows :data = "data" :column-data="columnData"></TableRows>
      </tbody>

    </table>


    <div v-if="isLoading" class="flex p-4 text-center w-full h-full justify-center items-center">
        <ArrowPathIcon class = "size-36 animate-spin mb-56 mt-32 text-green-400"></ArrowPathIcon>
    </div>

    <div v-if="!isLoading && data?.Items?.length === 0" class="flex p-4 text-center w-full h-full justify-center items-center">
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
 
  import TableRows from './TableRows.vue'
  import TableHeaders from './TableHeaders.vue'

  import { useAccommodationsQuery } from '@/composable/useAccomodationsQuery'
  import { headerColumns, columnData } from './ColumnValues'

  

  const route = useRoute()
  const accommodationStore = useAccommodationStore()

  //const auth = useAuth()
  

  //INITIAL FETCH: all other api calls happen because the queryKeys are updated
  const {isLoading, data} = useAccommodationsQuery()


  watch(data, async () => {

    if(accommodationStore.FirstTotalResults == 0){ //TODOO, an extra call mght be unnecessary here
      
      //const result = await api.get("Accommodation")
      const FirstTotalResults = data.value.TotalResults
      accommodationStore.FirstTotalResults = FirstTotalResults
    
    }

    const totalResults = computed(() => data.value?.TotalResults ?? 0)
    accommodationStore.TotalResults = totalResults.value
    
  }) 

  
  //INITIAL FETCH  
  onMounted(() => {
    accommodationStore.restoreFromUrl(route);

    //INFO, TODOO, 
    //by extracting the token from localstorage you can stay logged in after refreshes, useful when developing
    // this might be bad practice, tokens should be stored in HttpOnly Cookie
    /*const savedToken = localStorage.getItem('kc_token')
    if (savedToken) {
      auth.authenticate(savedToken)
      keycloak.token = savedToken
    }
    */

  });


</script>




<style scoped>
  table, th, td, tr {
    @apply border-[1px]
  }
</style>


