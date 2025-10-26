<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Cell from './Cell.vue'
import { createGrid, getRandomEmptyCell } from './helper'

const size = 4
const grid = ref(createGrid(size))

function calculateValues(key, size) {
  const newGrid = JSON.parse(JSON.stringify(grid.value))

  switch (key) {
    case 'ArrowUp':
      for (let j = 0; j <= size - 1; j++) {
        for (let i = 0; i < size - 1; i++) {
          let first = newGrid[i][j].value
          let second = newGrid[i + 1][j].value
          if (first === 0 && second === 0) {
            i++
          } else if (second === 0) {
            newGrid[i][j].value = 0
            newGrid[i + 1][j].value = first
          } else if (first === 0) {
            // skip
          } else if (first !== second) {
            // skip
          } else if (first === second) {
            newGrid[i][j].value = 0
            newGrid[i + 1][j].value = first + second
            i++
          }
        }
      }
      for (let j = 0; j <= size - 1; j++) {
        let last = 0
        for (let i = 0; i <= size - 1; i++) {
          if (newGrid[i][j].value === 0 && newGrid[last][j].value !== 0) {
            last = i
          } else if (newGrid[i][j].value !== 0 && newGrid[last][j].value === 0) {
            newGrid[last][j].value = newGrid[i][j].value
            newGrid[i][j].value = 0
            last = last + 1
          }
        }
      }
      grid.value = newGrid
      // Add your desired logic here
      break
    case 'ArrowDown':
      for (let j = 0; j <= size - 1; j++) {
        for (let i = size - 1; i > 0; i--) {
          let first = newGrid[i][j].value
          let second = newGrid[i - 1][j].value
          if (first === 0 && second === 0) {
            i--
          } else if (first === 0) {
            // skip
          } else if (second === 0) {
            newGrid[i][j].value = 0
            newGrid[i - 1][j].value = first
          } else if (first !== second) {
            // skip
          } else if (first === second) {
            newGrid[i][j].value = 0
            newGrid[i - 1][j].value = first + second
            i--
          }
        }
      }
      for (let j = 0; j <= size - 1; j++) {
        let last = size - 1
        for (let i = size - 1; i >= 0; i--) {
          if (newGrid[i][j].value === 0 && newGrid[last][j].value !== 0) {
            last = i
          } else if (newGrid[i][j].value !== 0 && newGrid[last][j].value === 0) {
            newGrid[last][j].value = newGrid[i][j].value
            newGrid[i][j].value = 0
            last = last - 1
          }
        }
      }
      grid.value = newGrid
      // Add your desired logic here
      break
    case 'ArrowLeft':
      for (let i = 0; i <= size - 1; i++) {
        for (let j = 0; j < size - 1; j++) {
          let first = newGrid[i][j].value
          let second = newGrid[i][j + 1].value
          if (first === 0 && second === 0) {
            j++
          } else if (second === 0) {
            newGrid[i][j + 1].value = first
            newGrid[i][j].value = 0
          } else if (first === 0) {
            // skip
          } else if (first !== second) {
            // skip
          } else if (first === second) {
            newGrid[i][j + 1].value = first + second
            newGrid[i][j].value = 0
            j++
          }
        }
      }
      for (let i = 0; i <= size - 1; i++) {
        let last = 0
        for (let j = 0; j <= size - 1; j++) {
          if (newGrid[i][j].value === 0 && newGrid[i][last].value !== 0) {
            last = j
          } else if (newGrid[i][j].value !== 0 && newGrid[i][last].value === 0) {
            newGrid[i][last].value = newGrid[i][j].value
            newGrid[i][j].value = 0
            last = last + 1
          }
        }
      }
      grid.value = newGrid
      // Add your desired logic here
      break
    case 'ArrowRight':
      for (let i = 0; i <= size - 1; i++) {
        for (let j = size - 1; j > 0; j--) {
          let first = newGrid[i][j].value
          let second = newGrid[i][j - 1].value
          if (first === 0 && second === 0) {
            j--
          } else if (second === 0) {
            newGrid[i][j].value = 0
            newGrid[i][j - 1].value = first
          } else if (first === 0) {
            // skip
          } else if (first !== second) {
            // skip
          } else if (first === second) {
            newGrid[i][j].value = 0
            newGrid[i][j - 1].value = first + second
            j--
          }
        }
      }
      for (let i = 0; i <= size - 1; i++) {
        let last = size - 1
        for (let j = size - 1; j >= 0; j--) {
          if (newGrid[i][j].value === 0 && newGrid[i][last].value !== 0) {
            last = j
          } else if (newGrid[i][j].value !== 0 && newGrid[i][last].value === 0) {
            newGrid[i][last].value = newGrid[i][j].value
            newGrid[i][j].value = 0
            last = last - 1
          }
        }
      }
      grid.value = newGrid
      // Add your desired logic here
      break
    default:
      // Handle other keys if needed
      break
  }
}

function keyboardListener(event, size) {
  // return error here, reset game with message
  // if (!emptyCell) return null
  // Prevent default action for arrow keys to avoid scrolling or other browser behaviors
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault()
    calculateValues(event.key, size)
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

<style scoped>
/* .grid {
  display: grid;
  grid-template-columns: repeat(4, 60px);
} */
</style>
