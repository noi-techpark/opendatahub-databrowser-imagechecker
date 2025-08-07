<template>
  <router-link :to="to" :class="classes">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { classes } from './styles'

defineProps<{
  to: RouteLocationRaw
}>()
</script>
