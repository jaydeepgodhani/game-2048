<script setup>
import { computed } from 'vue'
import { colorMap } from './helper'
const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: false,
  },
})

const selectedColor = computed(() => colorMap[props.value])
</script>

<template>
  <span
    class="w-[6rem] h-[6rem] border-2 flex items-center justify-center -ml-[2px] -mb-[2px]"
    :style="{ backgroundColor: selectedColor }"
  >
    <span v-if="props.value !== 0" class="text-3xl">{{ props.value }}</span>
  </span>
</template>
