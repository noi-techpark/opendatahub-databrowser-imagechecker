<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="h-full w-full overflow-auto">
    <table
      v-if="!showRawView"
      class="min-w-full w-full table-auto border-separate"
      cellspacing="0"
      cellpadding="5"
    >
      <TableHeaders :column-data="headerColumns"></TableHeaders>

      <tbody v-if="!isLoading && data?.Items?.length">
        <TableRows :data="data" :column-data="columnData" @showRaw="handleShowRaw"></TableRows>
      </tbody>
    </table>

    <div v-if="showRawView">
      <RawView v-if="RawJson" :RawJson="RawJson" @backToTable="showRawView = false"></RawView>
    </div>

    <div v-if="isLoading" class="flex p-4 text-center w-full h-full justify-center items-center">
      <ArrowPathIcon class="size-36 animate-spin mb-56 mt-32 text-green-400"></ArrowPathIcon>
    </div>

    <div
      v-if="!isLoading && data?.Items?.length === 0"
      class="flex p-4 text-center w-full h-full justify-center items-center"
    >
      <EyeSlashIcon class="size-36 animate-bounce mb-56 mt-32 text-green-400"></EyeSlashIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
//ICONS
import { ArrowPathIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

import { onMounted, watch } from 'vue'
import { useAccommodationStore } from '@/stores/AccommodationStore'
import { useRoute } from 'vue-router'

import TableRows from './TableRows.vue'
import TableHeaders from './TableHeaders.vue'
import RawView from './rawView/RawView.vue'

import { useAccommodationsQuery } from '@/composable/useAccomodationsQuery'
import { headerColumns, columnData } from './ColumnValues'

import { ref, toRaw } from 'vue'
import type { Accommodation } from './types'
import api from '@/components/utils/api'

const route = useRoute()

const accommodationStore = useAccommodationStore()
const showRawView = ref<boolean>(false)
const RawJson = ref<unknown | null>(null)

const isReadyToFetch = ref(false)
//INITIAL FETCH: all other api calls happen because the queryKeys are updated
onMounted(() => {

  accommodationStore.restoreFromUrl(route)

  isReadyToFetch.value = true
})

const { isLoading, data } = useAccommodationsQuery({enabled: isReadyToFetch})


watch(data, async () => {

     if(accommodationStore.FirstTotalResults === 0 && data.value?.TotalResults){ 
      const results = await api.get("Accommodation?fields=TotalResults");
      
      const FirstTotalResults = results.data.TotalResults
      accommodationStore.FirstTotalResults = FirstTotalResults
 
  }

  accommodationStore.TotalResults = data.value?.TotalResults ?? 0

})



function handleShowRaw(Item: Accommodation) {
  RawJson.value = toRaw(Item)
  showRawView.value = true
}
</script>

<style scoped>
table,
th,
td,
tr {
  @apply border-[1px];
}
</style>
