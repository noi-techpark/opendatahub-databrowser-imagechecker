<template>
  <div>
    <img v-if = "selectedImage?.ImageUrl "
      :src="selectedImage?.ImageUrl"
      alt="Accommodation Image"
      class="cursor-pointer"
      :style="{
        width: '100%',
        height: 'auto',
        objectFit: 'cover'
      }"
      @click="isFullView = true"
    />

    <PlaceHolderImage v-else></PlaceHolderImage>

    <ShowImageFullView v-if = "isFullView" :image="selectedImage" :date-formatter="DateFormatter" @close="isFullView = false"></ShowImageFullView>

   
  </div>

  
</template>

<script setup lang="ts">
 
  import type { Accommodation } from './types'
  import { computed, ref } from 'vue'
  import { useAccommodationStore } from '@/stores/AccomodationStore';
  
  import PlaceHolderImage from '@/components/Image/PlaceHolderImage.vue';
  import ShowImageFullView from '@/components/Image/showImageFullView.vue';

  const props = defineProps<{
    imageGallery: Accommodation['ImageGallery'] | null
    period: 'winter' | 'summer' | 'year' | 'mainImage'
  }>()
  
  const accommodationStore = useAccommodationStore()
  const isFullView = ref(false)

  const periodDates = {
    winter: '2020-01-15T00:00:00',
    summer: '2020-07-15T00:00:00',
  }

  const selectedImage = computed(() => { //selects the image representative of the period selected through the prop "period"
    const images = props.imageGallery || []
  
    return findRightImage(props.period, images)
  })


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

  //TODOO reformat, a switch case might be faster and easier to read
  function findRightImage(period: string, images: Accommodation['ImageGallery']){
    if (!images) return null
  
    if(period == "mainImage") return images[0]
    

    for(const image of images){

      if(period == "winter" && image !== images[0]){

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



 
    function DateFormatter(date: string){
    if(date == null)
      return "date unavailable"

    const d = new Date(date)
    
    return d.toLocaleDateString(accommodationStore.language.toLowerCase());
  }


</script>
