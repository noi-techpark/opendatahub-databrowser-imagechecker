<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>

    <div class="flex flex-col relative" ref = "target" >
       
        <component :is = "buttonComponent" class=" w-full" :class="[props.width, props.customClassButton]" @click="click">


            
            <div class="flex flex-row w-full  items-center space-x-3" :class="[props.width, props.customClassContent]">

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
        </component>

   
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

    import { ref, defineEmits, defineExpose, type DefineComponent, type Component } from 'vue';
    import { onClickOutside } from '@vueuse/core';

    const isOpen = ref(false);
    const target = ref(null);


    const emit = defineEmits(["toggle", "close"]);


    const props = withDefaults(defineProps<{
        title: string
        bold?: boolean
        width?: string
        customClassButton?: string,
        customClassContent?: string,
        arrowSize?: string
        showDown?: string,
        buttonComponent: Component
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

    onClickOutside(target, () => {
        if (isOpen.value) {
            close();
        }
    });

</script>



<style scoped>
    .rotate-90 {
    transform: rotate(90deg);
    transition: transform 0.3s ease;
    }
</style>
