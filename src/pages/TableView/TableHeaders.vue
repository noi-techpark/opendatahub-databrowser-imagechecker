<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->


<template>
      <TableHeader class = " sticky top-0 z-20 ">
        
        <TableHeaderWithPopup v-for="col in props.columnData" 
          :key="col.key" 
          :parameter="col.parameter" 
          :Popup="sortPopup" 
          :active-sort-column="activeSortColumn"
          @emit-event="handleSortUpdate(col.parameter)"
          class = "whitespace-nowrap">

            {{ col.label }}
        </TableHeaderWithPopup>

        <!-- Detail Column -->
        <TableHeaderWithPopup class="sticky right-0 bg-gray-50 w-52 z-30 shadow-[0px_0px_10px_-5px_gray]  " :show-popup="false"> 
            Detail
        </TableHeaderWithPopup>

      </TableHeader>

</template>

<script setup lang="ts">
 
    import TableHeaderWithPopup from '@/components/table/TableHeaderWithPopup.vue';
    import TableHeader from '@/components/table/TableHeader.vue';
    import sortPopup from './sortPopup.vue';
    import { ref } from 'vue';
  import type { HeaderItem } from './ColumnValues';

    const props = defineProps<{
      columnData: HeaderItem[]
    }>()

    const activeSortColumn = ref<string | null>(null)

    function handleSortUpdate(column: string) {
      activeSortColumn.value = column
    }



</script>

<style scoped>

  table, th, td, tr {
    @apply border-[1.5px] 
  }

</style>