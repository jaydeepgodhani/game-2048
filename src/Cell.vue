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
    class="lg:w-[3rem] lg:h-[3rem] md:w-[4rem] md:h-[4rem] lg:w-[6rem] lg:h-[6rem] h-[3rem] w-[3rem] drop-shadow-sm/15 flex items-center justify-center transition duration-300 rounded-[16px] m-[4px]"
    :style="{
      backgroundColor: selectedColor,
    }"
  >
    <span
      v-if="props.value !== 0"
      class="sm:text-xl md:text-2xl lg:text-3xl text-sm transition delay-200"
      ><b>{{ props.value }}</b></span
    >
  </span>
</template>
