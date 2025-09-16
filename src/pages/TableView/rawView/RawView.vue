<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>

    <div>

        <header class ="sticky top-0 bg-gray-50 font-bold flex flex-row text-xs items-center p-5  gap-3">

            <DatasetHeaderButton @click ="backToTable" class = "flex items-center font-bold"> 
                < Back to Table 
            </DatasetHeaderButton>

            <DatasetHeaderButton @click = "copyJson(JsonString)" class ="flex items-center gap ">
             
                <ClipboardDocumentCheckIcon class =" size-5 text-green-400"></ClipboardDocumentCheckIcon>
            </DatasetHeaderButton>

        </header>
        <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">
            <JsonViewer :data="props.RawJson" label="RESPONSE" />
        </pre>
    </div>
</template>



<script setup lang = "ts">
import { ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline';
import DatasetHeaderButton from '@/components/buttons/datasetHeaderButton.vue'
import JsonViewer from './JsonViewer.vue';
import type { JsonValue } from './types';

    const props = defineProps<{
        RawJson: JsonValue | unknown
    }>()

    const JsonString: string = (JSON.stringify(props.RawJson, null, 2))

    const emit = defineEmits(["backToTable"])

    function backToTable(){
        emit("backToTable")
    }

    async function copyJson(JsonString: string){
            await navigator.clipboard.writeText(JsonString)
    }
</script>





