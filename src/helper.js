const testGrid = [
  [2, 0, 2, 0, 0],
  [2, 0, 0, 0, 0],
  [0, 0, 2, 0, 2],
  [2, 0, 2, 0, 4],
  [2, 0, 2, 0, 4],
]

export function createGrid(size) {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => ({
      row,
      col,
      id: row * size + col + 1,
      value: testGrid[row][col],
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
