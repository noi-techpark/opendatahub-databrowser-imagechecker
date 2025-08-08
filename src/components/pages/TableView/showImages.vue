<template>
  <div>
    <img
      :src="selectedImage?.ImageUrl || imageNotFound"
      alt="Accommodation Image"
      style="width: 100px; height: auto; object-fit: cover"
    />
    <div class="flex flex-col">
      <p v-if="selectedImage">Valid from: {{ selectedImage.ValidFrom }}</p>
      <p v-if="selectedImage">Valid to: {{ selectedImage.ValidTo }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Accommodation } from './types'
import { computed } from 'vue'

const props = defineProps<{
  imageGallery: Accommodation['ImageGallery']
  period: 'winter' | 'summer' | 'year' | 'mainImage'
}>()

const imageNotFound =
  'https://imgs.search.brave.com/LeS4HHKZ1oz1T15VY5MwiUjWDjLiYKj0vgRABB3D2BY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2Lzg2LzE5LzM0/LzM2MF9GXzY4NjE5/MzQwN19ESFp3amV5/ZEJPUjF0RURrTEF6/d00zdzVrWXN0Unp6/Qi5qcGc'

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

// returns Image in ImageGallery that contains target Data string, if there are none returns null
function findImageByTargetDate(target: string, images: Accommodation['ImageGallery']) {
  if (!images) return null

  for (const image of images) {
    if (
      image.ValidFrom &&
      image.ValidTo &&
      isMonthDayInRange(target, image.ValidFrom, image.ValidTo)
    ) {
      return image
    }
  }

  return null
}



const selectedImage = computed(() => {
  const images = props.imageGallery || []

  const winterImg = findImageByTargetDate(periodDates.winter, images)
  const summerImg = findImageByTargetDate(periodDates.summer, images)

  if (props.period === 'winter' && winterImg && !summerImg) return winterImg
  if (props.period === 'summer' && summerImg && !winterImg) return summerImg
  if (props.period === 'year' && summerImg && winterImg) return summerImg
  if (props.period === 'mainImage') return images[0]

  return null
})
</script>
