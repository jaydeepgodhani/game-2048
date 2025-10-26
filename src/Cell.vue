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
    class="w-[6rem] h-[6rem] drop-shadow-sm/15 flex items-center justify-center transition duration-300 rounded-[16px] m-[4px]"
    :style="{
      backgroundColor: selectedColor,
    }"
  >
    <span v-if="props.value !== 0" class="text-3xl transition delay-200"
      ><b>{{ props.value }}</b></span
    >
  </span>
</template>
