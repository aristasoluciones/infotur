<template>
  <div v-if="shouldShow">
    <slot />
  </div>
</template>

<script setup lang="ts">
// core components
import { computed, inject } from 'vue';

// custom plugins
import {stepCounter as symbolStepCounter, currentStepIndex as symbolCurrentStepIndex } from "@/symbols/counterStep";

const currentIdx = inject(symbolStepCounter).value++;

const formStepIdx = inject(symbolCurrentStepIndex);

const shouldShow = computed(() => {
  return currentIdx === formStepIdx.value;
});
</script>