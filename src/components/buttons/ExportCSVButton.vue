<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
    <div class = "
    p-2 h-10 
    border rounded border-gray-300 hover:border-green-400
     hover:bg-green-400/10
    ">
        <button class ="flex flex-row space-x-1 w-full">
            <slot></slot>

            <p> Export </p>
        </button>
    </div>
</template>



<script setup lang="ts">





</script>