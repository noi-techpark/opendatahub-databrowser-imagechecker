<template>
  
  <div class="flex h-screen flex-col overflow-hidden">
    <Header class="sticky top-0 z-50 w-screen h-[55px]" />

     <ContentDivider class = "z-30" />

    <main class="flex-1 overflow-hidden  "> 
      <slot />
    </main>


    <Footer class=" sticky bottom-0  z-30" />
  </div>

</template>

<script setup lang="ts">

  import Header from './header.vue'
  import Footer from './footer.vue'
  import ContentDivider from '../contentAlignment/ContentDivider.vue';

</script>
