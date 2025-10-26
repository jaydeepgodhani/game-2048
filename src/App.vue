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
    <h1 class="font-bold">You did it!</h1>
    <button @click="handleClick" class="p-4 m-4 border-1">
      {{ startClicked ? 'reset' : 'start' }}
    </button>
    <div v-if="startClicked"><Board /></div>
    <div v-else>Please start the game</div>
  </div>
</template>
