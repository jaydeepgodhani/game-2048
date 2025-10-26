const testGrid = [
  [2, 0, 2, 0],
  [2, 0, 0, 0],
  [0, 0, 2, 0],
  [2, 0, 2, 0],
]

export function createGrid(size) {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: 4 }, (_, col) => ({
      row,
      col,
      id: row * 4 + col + 1,
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
