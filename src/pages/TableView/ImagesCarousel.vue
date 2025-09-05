<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->


<template>

        <div
            v-if="props.item"
            
            class="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50"
            @click.self="emit('close')"
            >

            <div class="mb-4 flex items-center justify-center space-x-2 w-full">
                <label class="text-white">Size:</label>
                    <input
                        type="range"
                        min="10"
                        max="30"
                        v-model="sizeRef"
                        class="w-64 accent-green-400"
                    />
                <span class="text-white">{{ sizeRef }}rem</span>
                
                <button @click = "emit('close')" class = "text-white text-2xl "> 
                    &times;
                </button>
            </div>

            
            
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 overflow-auto">
                <div
                    v-for="image in props.item.ImageGallery"
                    :key="image.ImageUrl"
                    class="flex flex-col items-center cursor-pointer"
                    @click = "openImage(image)"
                >
                    <img
                    :src="image?.ImageUrl || ''"
                    alt="Full view"
                    class="w-full object-cover rounded-lg"
                    :style="{ width: sizeRef + 'rem', height: sizeRef + 'rem', objectFit: 'cover' }"
                    />
                    
                    <div class="text-sm  mt-2 text-white">
                        <p v-if="image.ValidFrom" >from: {{ DateFormatter(image.ValidFrom) }}</p>
                        <p v-if="image.ValidTo" >to: {{ DateFormatter(image.ValidTo) }}</p>
                        <p v-else class = "text-gray-500">Missing Validity Dates</p>
                    </div>

                    


                </div>
            </div>


            <ShowImageFullView v-if = "isFullView && selectedImage" :image="selectedImage" :date-formatter="DateFormatter" @close="isFullView = false"  ></ShowImageFullView>


            
        </div>


</template>

<script setup lang="ts">
    
   
    import ShowImageFullView from '@/components/Image/showImageFullView.vue';
    import { useAccommodationStore } from '@/stores/AccomodationStore';
    import { ref } from 'vue';
    import type { Accommodation } from './types';


    const accommodationStore = useAccommodationStore()
    const sizeRef = ref(10)
    const isFullView = ref(false)
    const selectedImage = ref<{
        ValidFrom: string;
        ValidTo: string;
        ImageUrl: string;
    } | null>(null)

    const props = defineProps<{
        item: Accommodation
        
    }>()
    const emit = defineEmits<{
        (e: "close"): void
    }>()
    

   function DateFormatter(date: string){
    if(date == null)
      return "date unavailable"

    const d = new Date(date)
    return d.toLocaleDateString(accommodationStore.language.toLowerCase());
  }


  function openImage(image: {
        ValidFrom: string;
        ValidTo: string;
        ImageUrl: string;
    } ){
    selectedImage.value = image
    isFullView.value = true
}






</script>
