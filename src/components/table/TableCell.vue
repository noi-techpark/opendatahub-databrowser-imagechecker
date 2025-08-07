<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <td :class="['leading-tight w-40 border px-2 py-1', customClass]">
    <slot width="100px"></slot>
  </td>
</template>

<script setup lang="ts">
  defineProps<{
    customClass?: string
  }>()
</script>
