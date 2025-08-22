<template>
  <div>
    <img
      :src="selectedImage?.ImageUrl || imageNotFound"
      alt="Accommodation Image"
      class="cursor-pointer"
      :style="{
        width: '100%',
        height: 'auto',
        objectFit: 'cover'
      }"
      @click="isFullView = true"
    />


    
    <div
      v-if="isFullView"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      @click.self="isFullView = false"
    >
      <div class="flex flex-col h-full text-white text-xl absolute left-5 top-5 ">
          <p class = ""> validity:</p>
          <p v-if="selectedImage">from: {{ DateFormatter(selectedImage.ValidFrom) }}</p>
          <p v-if="selectedImage">to: {{ DateFormatter(selectedImage.ValidTo) }}</p>
          <div class="h-full" @click.self = "isFullView = false"></div>
      </div>

      <img
        :src="selectedImage?.ImageUrl || imageNotFound"
        alt="Full view"
        class="max-w-full max-h-full"
      />

      <button
        @click="isFullView = false"
        class="absolute top-4 right-4 text-white text-2xl font-bold"
      >
        &times;
      </button>

      

    </div>

   
  </div>

  
</template>

<script setup lang="ts">
  import { useLanguageStore } from '@/stores/HeaderTableStore';
  import type { Accommodation } from './types'
  import { computed, ref } from 'vue'

  

  const props = defineProps<{
    imageGallery: Accommodation['ImageGallery'] | null
    period: 'winter' | 'summer' | 'year' | 'mainImage'
  }>()
  

  const languageStore = useLanguageStore()
  const isFullView = ref(false)
  const imageNotFound = 'https://imgs.search.brave.com/LeS4HHKZ1oz1T15VY5MwiUjWDjLiYKj0vgRABB3D2BY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2Lzg2LzE5LzM0/LzM2MF9GXzY4NjE5/MzQwN19ESFp3amV5/ZEJPUjF0RURrTEF6/d00zdzVrWXN0Unp6/Qi5qcGc'
  // 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
  const periodDates = {
    winter: '2020-01-15T00:00:00',
    summer: '2020-07-15T00:00:00',
  }



  // returns true if the target Date string is included in the from-to interval, ignores the year
  function isMonthDayInRange(target: string, from: string, to: string): boolean {
    const toMonthDay = (dateStr: string): string => {
      const date = new Date(dateStr)
      const mm = String(date.getMonth() + 1).padStart(2, '0')
      const dd = String(date.getDate()).padStart(2, '0')
      return `${mm}-${dd}`
    }

    const targetMD = toMonthDay(target)
    const fromMD = toMonthDay(from)
    const toMD = toMonthDay(to)

    if (fromMD <= toMD) {
      return targetMD >= fromMD && targetMD <= toMD
    }

    return targetMD >= fromMD || targetMD <= toMD
  }

  function DateFormatter(date: string){
    if(date == null)
      return "date unavailable"

    const d = new Date(date)
    
    return d.toLocaleDateString(languageStore.language.toLowerCase());
  }


  //TODOO reformat, a switch case might be faster and easier to read
  function findRightImage(period: string, images: Accommodation['ImageGallery']){
    if (!images) return null
  
    if(period == "mainImage") return images[0]
    

    for(const image of images){

      if(period == "winter"){

          if(isMonthDayInRange(periodDates.winter, image.ValidFrom, image.ValidTo) && !isMonthDayInRange(periodDates.summer, image.ValidFrom, image.ValidTo))
            return image
      }
      if(period == "summer"){

          if(isMonthDayInRange(periodDates.summer, image.ValidFrom, image.ValidTo) && !isMonthDayInRange(periodDates.winter, image.ValidFrom, image.ValidTo))
            return image

      }
      if(period == "year"){

        if(isMonthDayInRange(periodDates.summer, image.ValidFrom, image.ValidTo) && isMonthDayInRange(periodDates.winter, image.ValidFrom, image.ValidTo))
            return image

      }
    }

  
    return null
  }

   const selectedImage = computed(() => { //selects the image representative of the period selected through the prop "period"
    const images = props.imageGallery || []
  
    return findRightImage(props.period, images)
  })

 
  

</script>
