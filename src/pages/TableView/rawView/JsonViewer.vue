<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->


<template>
<!-- on first iteration the object is the whole json object, then it recxursively calls itself for each vlaue in the data object-->
  <div class="json-viewer text-sm font-mono">
    <!-- Object -->
    <template v-if="isObject(props.data)">
      <div>

            <span @click="expanded = !expanded" class="cursor-pointer select-none">
                {{ expanded ? '▼' : '▶' }} 
                <span v-if="label"> 
                    {{ label }}: 
                </span>{Object}
            </span>

            <div v-show="expanded" class="pl-4">
                <JsonViewer
                    v-for="(value, key) in data"
                    :key="key"
                    :data="value"
                    :label="String(key)"
                />
            </div>

      </div>
    </template>

    <!-- Array -->
    <template v-else-if="Array.isArray(data)">
        <div>
                <span @click="expanded = !expanded" class="cursor-pointer select-none">
                    {{ expanded ? '▼' : '▶' }} 
                    <span v-if="label">{{ label }}: </span>[Array] ({{ data.length }})
                </span>
                <div v-show="expanded" class="pl-4">
                    <JsonViewer
                        v-for="(item, index) in data"
                        :key="index"
                        :data="item"
                        :label="index.toString()"
                    />
                </div>
        </div>
    </template>

    <!-- Primitive values -->
    <template v-else>
        <div>
                <span v-if="label" class="font-semibold">{{ label }}: </span>

                <span v-if="typeof data === 'string'" class="text-blue-600">"{{ data }}"</span>
                <span v-else class="text-green-600">{{ data }}</span>
        </div>
    </template>
    
  </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import type { JsonValue } from './types';

    const props = defineProps<{
    data: JsonValue | unknown
    label?: string
    }>()

    const expanded = ref(true)

    function isObject(val: JsonValue | unknown) {
    return val !== null && typeof val === 'object' && !Array.isArray(val)
    }

</script>
