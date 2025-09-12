<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>

    <div>

        <header class ="bg-white sticky top-0 bg-gray-50 font-bold">
            <DatasetHeaderButton @click ="backToTable"> 
                Back to Table 
            </DatasetHeaderButton>
        </header>
        <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">
            <JsonViewer :data="props.RawJson" label="RESPONSE" />
        </pre>
    </div>
</template>



<script setup lang = "ts">
import DatasetHeaderButton from '@/components/buttons/datasetHeaderButton.vue';
import JsonViewer from './JsonViewer.vue';
import type { JsonValue } from './types';

    const props = defineProps<{
        RawJson: JsonValue
    }>()

    console.log(props.RawJson)
    const emit = defineEmits(["backToTable"])

    function backToTable(){
        emit("backToTable")
    }
</script>