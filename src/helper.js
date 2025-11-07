const testGrid5 = [
  [2, 4, 8, 16, 32],
  [1024, 512, 256, 128, 64],
  [2048, 0, 2, 0, 2],
  [2, 0, 2, 0, 4],
  [2, 0, 2, 0, 4],
]

const testGrid4 = [
  [2, 4, 8, 16],
  [512, 128, 64, 32],
  [1024, 2048, 0, 0],
  [0, 0, 0, 0],
]

export function createGrid(size) {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => ({
      row,
      col,
      id: row * size + col + 1,
      value: 0,
    })),
  )
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

export function getEmptyCells(grid) {
  const emptyCells = []
  for (const row of grid) {
    for (const cell of row) {
      if (cell.value === 0) emptyCells.push(cell)
    }
  }
  return emptyCells
}

export function getRandomEmptyCell(grid) {
  const emptyCells = getEmptyCells(grid)
  if (emptyCells.length === 0) return null
  const randomIndex = getRandomInt(emptyCells.length)
  return emptyCells[randomIndex]
}

export function calculateValues(key, size, grid) {
  const newGrid = JSON.parse(JSON.stringify(grid))

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
      break
    case 'ArrowDown':
      for (let j = 0; j <= size - 1; j++) {
        for (let i = size - 1; i > 0; i--) {
          let first = newGrid[i][j].value
          let second = newGrid[i - 1][j].value
          if (first === 0 && second === 0) {
            i--
          } else if (second === 0) {
            newGrid[i][j].value = 0
            newGrid[i - 1][j].value = first
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
      break
  }
  return newGrid
}

export const colorMap = {
  0: '#fff',
  2: 'oklch(98.7% 0.026 102.212)',
  4: 'oklch(97.3% 0.071 103.193)',
  8: 'oklch(95.4% 0.038 75.164)',
  16: 'oklch(93.6% 0.032 17.717)',
  32: 'oklch(93.2% 0.032 255.585)',
  64: 'oklch(95.3% 0.051 180.801)',
  128: 'oklch(95.6% 0.045 203.388)',
  256: 'oklch(95.1% 0.026 236.824)',
  512: 'oklch(93.2% 0.032 255.585)',
  1024: 'oklch(93% 0.034 272.788)',
  2048: 'oklch(94.3% 0.029 294.588)',
}
