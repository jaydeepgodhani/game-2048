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
  <span class="w-[6rem] h-[6rem] border-1 flex items-center justify-center">
    <span v-if="value !== 0" class="text-3xl">{{ value }}</span>
  </span>
</template>

<style scoped></style>
