<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <Header class="sticky top-0 z-10 w-screen" />

    <main class="flex-1 overflow-hidden"> 
      <slot />
    </main>

   <Footer class="sticky bottom-0 z-10" />
  
  </div>
</template>

<script setup lang="ts">
import Header from './header.vue'
import Footer from './footer.vue'

import { ref } from 'vue'

withDefaults(defineProps<{ showAppFooter?: boolean }>(), { showAppFooter: true })


</script>
