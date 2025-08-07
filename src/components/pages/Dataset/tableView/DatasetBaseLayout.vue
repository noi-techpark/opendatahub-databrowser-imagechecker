<template>
   <AppLayout>

      <ContentDivider/>

      <div class="relative flex h-full overflow-y-auto">
         <div class="flex flex-1 flex-col overflow-x-auto">
      
            <DatasetHeader />

           
            <slot></slot>
            
         </div>
    </div>
   </AppLayout>
</template>


<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import ContentDivider from '@/components/contentAlignment/ContentDivider.vue';
import DatasetHeader from '@/components/layout/DatasetHeader.vue';
import AlignX from '@/components/contentAlignment/AlignX.vue';

</script>