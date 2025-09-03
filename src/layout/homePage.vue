<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
