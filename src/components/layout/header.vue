<template>
  <header v-bind="$attrs" class="sticky top-0 w-full bg-white">
    <AlignX class="m-auto flex flex-row gap-x-12 gap-y-2 px-4 pb-2 md:pb-0 w-full">
        
        
        <HeaderButton> 
          <RouterLink to = "/">
            //LOGO
          </RouterLink>

        </HeaderButton>
        <HeaderButton class=" text-xs font-bold">Testing</HeaderButton>
        <HeaderButton class=" text-xs font-bold">About</HeaderButton>
        <HeaderButton class=" text-xs font-bold">How to</HeaderButton>
        <HeaderButton class=" text-xs font-bold">Contact</HeaderButton>
        <HeaderButton class=" ml-default">Profile</HeaderButton>

        
    </AlignX>
    
  </header>
</template>

<script setup lang="ts">
  import HeaderButton from '../header/headerButton.vue';
  import CardTitle from '../card/CardTitle.vue';
  import AlignX from '../contentAlignment/AlignX.vue';


  defineOptions({ inheritAttrs: false }) 
</script>
