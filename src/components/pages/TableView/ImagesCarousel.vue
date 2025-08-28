<template>

        <div
            v-if="props.item"
            class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            @click.self="emit('close')"
            >
            <div class="flex flex-row space-x-4 max-w-screen overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-700 ">
                <div 
                    v-for="image in props.item.ImageGallery" 
                    :key="image.ImageUrl" 
                    class="flex flex-col items-center flex-shrink-0"
                    >
               
                    <img 
                        :src="image?.ImageUrl || ''"
                        alt="Full view"
                        class="w-40 h-40 object-cover"
                    />
                    <p v-if="image.ValidFrom" class="text-white">from: {{ DateFormatter(image.ValidFrom) }}</p>
                    <p v-if="image.ValidTo" class="text-white">to: {{ DateFormatter(image.ValidTo) }}</p>
                </div>
            </div>
        </div>


</template>

<script setup lang="ts">

    import { useAccommodationStore } from '@/stores/AccomodationStore';
    import { ref,  } from 'vue';

    const accommodationStore = useAccommodationStore()
    const props = defineProps<{
        item: any 
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





</script>
