<script setup>
const props = defineProps({
  value: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="bg-gray-100 border-2 rounded-xl w-full drop-shadow-sm/15"
  >
    <path stroke-linecap="round" stroke-linejoin="round" :d="props.value" />
  </svg>
</template>
