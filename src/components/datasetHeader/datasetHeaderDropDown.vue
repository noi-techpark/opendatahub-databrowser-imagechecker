<template>

    <div class="flex flex-col relative" >
       
        <DatasetHeaderButton class=" w-full" :class="props.width" @click="click">


            
            <div class="flex flex-row w-full  items-center space-x-3" :class="props.width">

                <slot name="icon" />
                
                <p v-if =  "!bold">{{ props.title }}</p>
                <b v-if =  "bold">{{ props.title }}</b>
                <div class="flex-1  w-full flex justify-end">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                :class="[{ 'rotate-180': isOpen }, arrowSize ? arrowSize : 'size-6']"  >
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                </svg>

                </div>
            </div>
        </DatasetHeaderButton>

   
        <!--contains the dropdown menu's Options-->
        <div 
          v-if="isOpen" 
          class="flex flex-col absolute bg-white w-full border rounded border-gray-400 overflow-y-auto max-h-52 z-10"
          :class= "showDown? showDown : 'top-full'"
        >
            <slot></slot>
        </div>
    </div>
</template> 

<script setup lang="ts">
    import DatasetHeaderButton from './datasetHeaderButton.vue';
    import { ref, defineEmits, defineExpose } from 'vue';

    const isOpen = ref(false);
    const emit = defineEmits(["toggle", "close"]);


    const props = withDefaults(defineProps<{
        title: string
        bold?: boolean
        width: string
        arrowSize?: string
        showDown?: string
    }>(),
    {
        title: "",
        bold: false,
        width: "w-52"
    }
    )

    function click() {
    isOpen.value = !isOpen.value;
    emit('toggle', isOpen.value);
    }

    function close() {
    isOpen.value = false;
    emit('close');
    }

    defineExpose({ close });

    </script>



    <style scoped>
    .rotate-90 {
    transform: rotate(90deg);
    transition: transform 0.3s ease;
    }
    </style>
