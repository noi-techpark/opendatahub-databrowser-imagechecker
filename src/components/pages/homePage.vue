<template>
  <div class="flex h-screen w-screen bg-white">
     <BaseLayout>
      <TableView class = "w-full bg-white mx-auto  my-2"></TableView>
    </BaseLayout>
  </div>
</template>

<script setup lang="ts">

import BaseLayout from '../layout/BaseLayout.vue';

import TableView from './Dataset/tableView/TableView.vue';

</script>
