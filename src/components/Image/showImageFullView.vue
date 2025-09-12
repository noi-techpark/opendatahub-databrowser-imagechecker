<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template> 
    <div
                    
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
        @click.self="emit('close')"
        >
        <div class="flex flex-col h-full text-white text-xl absolute left-5 top-5 ">
            <p class = ""> validity:</p>
            <p v-if="props.image">from: {{ props.dateFormatter(props.image.ValidFrom) }}</p>
            <p v-if="image">to: {{ props.dateFormatter(props.image.ValidTo) }}</p>
            <div class="h-full" @click.self = "emit('close')"></div>
        </div>

        
        <img
            :src="props.image?.ImageUrl"
            alt="Full view"
            class="max-w-full max-h-full"
        />

        <button
            @click="emit('close')"
            class="absolute top-4 right-4 text-white text-2xl font-bold"
        >
            &times;
        </button>


    </div>
</template>


<script setup lang="ts">

    const props = defineProps<{
        image: {
            ValidFrom: string,
            ValidTo: string,
            ImageUrl: string
        }
        dateFormatter: (date: string) => string
    }>()

    const emit = defineEmits(["close"])


</script>