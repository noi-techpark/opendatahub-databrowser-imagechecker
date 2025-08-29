<template>
  <div class="flex overflow-hidden h-screen w-screen bg-white">
     <BaseLayout>
        <TableView></TableView>
    </BaseLayout>

  </div>
</template>

<script setup lang="ts">

import BaseLayout from '../layout/BaseLayout.vue';
import TableView from '@/pages/TableView/TableView.vue';

</script>
