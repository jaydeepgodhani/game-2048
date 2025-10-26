<script setup>
import { ref } from 'vue'
import Board from './Board.vue'
const startClicked = ref(true)

function handleClick() {
  startClicked.value = !startClicked.value
}
</script>

<template>
  <div class="flex items-center flex-col">
    <div v-if="startClicked" class="mb-16"><Board /></div>
    <div v-else class="text-xl my-16">Please start the game</div>
    <button @click="handleClick" class="py-2 px-8 m-4 border-2 rounded-full text-xl">
      {{ startClicked ? 'Reset' : 'Start' }}
    </button>
  </div>
</template>
