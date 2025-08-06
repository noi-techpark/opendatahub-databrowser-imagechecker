<template>
    <component
    :is = "tagName"
    class = "flex justify-between text-xl font-semibold leading-tight lg:text-2xl">

    <slot></slot>

    </component>
</template>


<script setup lang="ts">
import type { Component } from 'vue';

    const props = withDefaults(
        defineProps<{
            tagName?: string | Component;
        }>(),
        {
            tagName: undefined,
        }
    );
</script>