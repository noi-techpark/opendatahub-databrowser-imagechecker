<template>
  <header v-bind="$attrs" class="sticky top-0 w-full bg-white ">
    <AlignX class="flex flex-row gap-x-8 gap-y-2 md:pb-0 w-full ">
      
      <HeaderButton>
        <RouterLink to="/" class ="no-underline"> 
          <div class = "border border-black rounded-lg
                        p-3 h-12
                        items-start justify-center flex flex-col"> 
            <b>DATA</b> <b>BROWSER</b>
          </div>  
        </RouterLink>
      </HeaderButton>

      <HeaderButton>     
        <div class=" bg-yellow-400 flex justify-center  items-center h-12 w-24 rounded-lg">
          <p>TESTING</p>  
        </div>
      </HeaderButton>

      <HeaderButton class="">About</HeaderButton>
      <HeaderButton class=" whitespace-nowrap">How To</HeaderButton>
      <HeaderButton class="">Contact</HeaderButton>

      <div class=" w-screen flex justify-end mr-6">
        <HeaderButton>Profile</HeaderButton>
      </div>

    </AlignX>
  </header>
</template>

<script setup lang="ts">
import HeaderButton from '../header/headerButton.vue'
import AlignX from '../contentAlignment/AlignX.vue'

defineOptions({ inheritAttrs: false })
</script>
