<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>

    <div>

        <header class ="sticky top-0 bg-gray-50 font-bold flex flex-row text-xs items-center gap-3 border-t border-b pl-5 p-2">

            <DatasetHeaderButton @click ="backToTable" class = "flex items-center font-bold"> 
                <ArrowLeftIcon class ="size-4 mr-2 " /> Back to Table 
            </DatasetHeaderButton>

            <DatasetHeaderButton @click = "copyJson(JsonString)" class ="flex items-center gap "
            :class="isPulsing ? 
            'animate-pulse bg-yellow-400/10 border-yellow-400 border-2 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400' : ''"
            >
             
                <ClipboardDocumentCheckIcon class =" size-5 text-green-400"
           
                />

            </DatasetHeaderButton>

        </header>
        <pre class="bg-white ml-5 rounded text-sm overflow-auto">
            <JsonViewer :data="props.RawJson" label="RESPONSE" />
        </pre>
    </div>
</template>



<script setup lang = "ts">
import { ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline';
import { ArrowLeftIcon } from '@heroicons/vue/16/solid';
import DatasetHeaderButton from '@/components/buttons/datasetHeaderButton.vue'
import JsonViewer from './JsonViewer.vue';
import type { JsonValue } from './types';
import { ref } from 'vue';

    const props = defineProps<{
        RawJson: JsonValue | unknown
    }>()

    const JsonString: string = (JSON.stringify(props.RawJson, null, 2))
    const isPulsing = ref(false)

    const emit = defineEmits(["backToTable"])

    function backToTable(){
        emit("backToTable")
    }

    async function copyJson(JsonString: string){
            await navigator.clipboard.writeText(JsonString)
            isPulsing.value = true;
            setTimeout(() => {
                isPulsing.value = false;
            }, 800);
    }

</script>





