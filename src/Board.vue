<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Cell from './Cell.vue'
import { calculateValues, createGrid, getRandomEmptyCell } from './helper'

const size = 4
const grid = ref(createGrid(size))

function keyboardListener(event, size) {
  // return error here, reset game with message
  // if (!emptyCell) return null
  // Prevent default action for arrow keys to avoid scrolling or other browser behaviors
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault()
    grid.value = calculateValues(event.key, size, grid.value)
    const emptyCell = getRandomEmptyCell(grid.value)
    grid.value[emptyCell.row][emptyCell.col].value = 2
  }
}

onMounted(() => {
  window.addEventListener('keydown', (e) => keyboardListener(e, size))
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', (e) => keyboardListener(e, size))
})
</script>

<template>
  <div class="flex items-center flex-col">
    <h1>Board</h1>
    <div v-for="row in grid" :key="row[0].id" class="flex flex-row justify-center">
      <Cell v-for="cell in row" :key="cell.id" :number="cell.id" :value="cell.value" />
    </div>
  </div>
</template>
