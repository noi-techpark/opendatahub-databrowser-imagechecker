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

import { onMounted, computed, watch } from 'vue'
import { useAccommodationStore } from '@/stores/AccomodationStore'
import { useRoute } from 'vue-router'

import TableRows from './TableRows.vue'
import TableHeaders from './TableHeaders.vue'
import RawView from './rawView/RawView.vue'

import { useAccommodationsQuery } from '@/composable/useAccomodationsQuery'
import { headerColumns, columnData } from './ColumnValues'

import { ref, toRaw } from 'vue'
import type { Accommodation } from './types'
import { useAuth } from '@/auth/authStores/auth'

const route = useRoute()
const auth = useAuth()
const accommodationStore = useAccommodationStore()
const showRawView = ref<boolean>(false)
const RawJson = ref<unknown | null>(null)

//INITIAL FETCH: all other api calls happen because the queryKeys are updated
const { isLoading, data } = useAccommodationsQuery()

watch(data, async () => {

  if (accommodationStore.FirstTotalResults === 0 && Object.keys(route.query).length === 0) {
    const FirstTotalResults = data.value.TotalResults

    if (auth.isAuthenticated){
      localStorage.setItem('FirstTotalResultsWithAuth', FirstTotalResults)
      accommodationStore.FirstTotalResults = Number(localStorage.getItem('FirstTotalResultsWithAuth'))
    }
    else
      localStorage.setItem('FirstTotalResultsNoAuth', FirstTotalResults)
    

  }

  const totalResults = computed(() => data.value?.TotalResults ?? 0)
  accommodationStore.TotalResults = totalResults.value

})


watch(auth, () => {

  if (auth.isAuthenticated)
    accommodationStore.FirstTotalResults = Number(localStorage.getItem('FirstTotalResultsWithAuth'))
  else
    accommodationStore.FirstTotalResults = Number(localStorage.getItem('FirstTotalResultsNoAuth'))

})


onMounted(() => {
  accommodationStore.restoreFromUrl(route)
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
