<template>
    <component
     :is = "tagName"
     class = "flex flex-col rounded border border-gray-300 w-full h-10"
     :class = "paddingClasses"
    >

    <slot></slot>

    </component>
</template>


<script setup lang="ts">
import { computed, type Component } from 'vue';

    const props = withDefaults(

        defineProps<{
            tagName?: string | Component;
            noPadding?: boolean;

        }>(),
    
        {
            tagName: "div",
            noPadding: false
        }

    );

    const paddingClasses = computed(() =>
        props.noPadding ? '' : 'px-3 pt-3 pb-5 lg:px-5 lg:pt-4',

    );
    

</script>