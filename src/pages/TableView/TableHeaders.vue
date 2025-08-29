<template>
      <TableHeader class = " sticky top-0 z-20 ">
        
        <TableHeaderWithPopup v-for="col in props.columnData" :key="col.parameter" :parameter="col.parameter" :Popup="sortPopup">
            {{ col.label }}
        </TableHeaderWithPopup>

        <!-- Detail Column -->
        <TableHeaderWithPopup class="sticky right-0 bg-gray-50 w-52 z-30 shadow-[0px_0px_10px_-5px_gray]  " :show-popup="false"> <!--shadow-[inset_4px_0_4px_-4px_rgba(0,0,0,0.1)]-->
            Detail
        </TableHeaderWithPopup>
        
      </TableHeader>

</template>

<script setup lang="ts">
    import TableHeaderWithPopup from '@/components/table/TableHeaderWithPopup.vue';
    import TableHeader from '@/components/table/TableHeader.vue';
    import sortPopup from './sortPopup.vue';
    
    const props = defineProps<{
      columnData: any
    }>()


</script>

<style scoped>

  table, th, td, tr {
    @apply border-[1.5px] 
  }

</style>