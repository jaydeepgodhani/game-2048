<script setup>
defineProps({
  number: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: false,
  },
})
</script>

<template>
  <span class="w-[6rem] h-[6rem] border-2 flex items-center justify-center -ml-[2px] -mb-[2px]">
    <span v-if="value !== 0" class="text-3xl">{{ value }}</span>
  </span>
</template>
