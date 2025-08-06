<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { classes } from './styles';
</script>
