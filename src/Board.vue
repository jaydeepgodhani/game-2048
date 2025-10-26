<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Cell from './Cell.vue'
import { calculateValues, createGrid, getRandomEmptyCell } from './helper'

const size = 4
const grid = ref(createGrid(size))
const lastGrid = ref()

function keyboardListener(event, size) {
  // return error here, reset game with message
  // if (!emptyCell) return null
  // Prevent default action for arrow keys to avoid scrolling or other browser behaviors
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault()
    const calculatedGrid = calculateValues(event.key, size, grid.value)
    lastGrid.value = grid.value
    grid.value = calculatedGrid
    const emptyCell = getRandomEmptyCell(grid.value)
    grid.value[emptyCell.row][emptyCell.col].value = 2
  }

  const isCtrlOrCmd = event.ctrlKey || event.metaKey
  if (isCtrlOrCmd && event.key === 'z') {
    event.preventDefault()
    grid.value = lastGrid.value
  }
}

function handleClick() {
  const newGrid = createGrid(size)
  grid.value = newGrid
  lastGrid.value = newGrid
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
    <h1 class="text-4xl my-16">2048</h1>
    <div v-for="row in grid" :key="row[0].id" class="flex flex-row justify-center">
      <Cell v-for="cell in row" :key="cell.id" :number="cell.id" :value="cell.value" />
    </div>
    <div class="mt-8">
      <button
        @click="handleClick"
        class="py-2 px-8 m-4 border-2 rounded-full text-xl flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        &nbsp;
        <span> Reset </span>
      </button>
    </div>
    <div class="mt-8 text-xl flex flex-col items-center justify-center">
      <div class="flex py-2">
        Use Arrow keys &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="bg-gray-100 border-slate-300 border-2 rounded-lg size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="bg-gray-100 border-slate-300 border-2 rounded-lg size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
        &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="bg-gray-100 border-slate-300 border-2 rounded-lg size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
          />
        </svg>
        &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="bg-gray-100 border-slate-300 border-2 rounded-lg size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </div>

      <div>
        <span class="bg-gray-100 border-slate-300 border-2 rounded-lg px-2">ctrl + z</span>
        to undo once
      </div>
    </div>
  </div>
</template>
