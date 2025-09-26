<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    
    <img v-if = "selectedImage?.image?.ImageUrl "
      :src="selectedImage?.image.ImageUrl"
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
   
    <!--TODOO decide if showing classification also for main and all year images
    && (selectedImage?.Period === 'winter' || selectedImage?.Period === 'summer')
    -->
    
    <ImageClassifier 
    v-if ="selectedImage?.image?.ImageUrl  && accommodationStore.toggleImageClassification && (selectedImage?.Period === 'winter' || selectedImage?.Period === 'summer')" 
    :-image-url="selectedImage.image.ImageUrl" 
    type="icon"
    />


 
   <ShowImageFullView v-if = "isFullView && selectedImage" 
   :image="selectedImage.image" :date-formatter="DateFormatter" @close="isFullView = false"></ShowImageFullView>

  
  </div>

  
</template>

<script setup lang="ts">
 
  import type { Accommodation } from '../types';
  import { computed, ref } from 'vue'
  import { useAccommodationStore } from '@/stores/AccommodationStore';
  
  import PlaceHolderImage from '@/components/Image/PlaceHolderImage.vue';
  import ShowImageFullView from '@/components/Image/showImageFullView.vue';
  import ImageClassifier from '@/ImageRecognition/ImageClassifier.vue';



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

  const selectedImage= computed(() => { //selects the image representative of the period selected through the prop "period"
    const images = props.imageGallery || []
  
    return findRightImage(props.period, images)
  })

  interface ImageCustom{
    image: {
      ValidFrom: string;
      ValidTo: string;
      ImageUrl: string;
      Width: number;
      Height: number;
    }
    Period: string,
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

  //TODOO reformat, a switch case might be faster and easier to read
  function findRightImage(period: string, images: Accommodation['ImageGallery']): ImageCustom | null{
    if (!images) return null

  

    if(period == "mainImage")
      return {
        image: images[0],
        Period: "mainImage"
      }
    

    for(const image of images){

      if(period == "winter" && image !== images[0]){

          if(isMonthDayInRange(periodDates.winter, image.ValidFrom, image.ValidTo) && !isMonthDayInRange(periodDates.summer, image.ValidFrom, image.ValidTo))
            return {
              image: image,
              Period: "winter"
            }

      }
      if(period == "summer"){

          if(isMonthDayInRange(periodDates.summer, image.ValidFrom, image.ValidTo) && !isMonthDayInRange(periodDates.winter, image.ValidFrom, image.ValidTo))
            return {
              image: image,
              Period: "summer"
            }

      }
      if(period == "year"){

        if(isMonthDayInRange(periodDates.summer, image.ValidFrom, image.ValidTo) && isMonthDayInRange(periodDates.winter, image.ValidFrom, image.ValidTo))
            return {
              image: image,
              Period: "year"
            }

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
