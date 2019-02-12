const livingNeighbors = (i, j, grid) => {
  let livingNeighbors = 0
  for (let k = i - 1; k <= i + 1; k++) {
    for (let l = j - 1; l <= j + 1; l++) {
      if (
        !(k === i && l === j) && // <---------- je crois qu'on avais mal codé cette coidition
        k >= 0 && k < grid.length &&
        l >= 0 && l < grid[0].length &&
        grid[k][l] === '#') {
        livingNeighbors++
      }
    }
  }
  return livingNeighbors
}

const enforceOverpop = (i, j, grid, newGrid) => {
  if (grid[i][j] === '#' && livingNeighbors(i, j, grid) > 3) {
    return '.'
  }
  return newGrid[i][j]
}

const enforceUnderpop = (i, j, grid, newGrid) => {
  if (grid[i][j] === '#' && livingNeighbors(i, j, grid) < 2) {
    return '.'
  }
  return newGrid[i][j]
}

const enforceEquilibrium = (i, j, grid, newGrid) => {
  const test = livingNeighbors(i, j, grid)
  if (grid[i][j] === '#' && (test === 2 || test === 3)) {
    return '#'
  }
  return newGrid[i][j]
}

const enforceReproduction = (i, j, grid, newGrid) => {
  if (grid[i][j] === '.' && livingNeighbors(i, j, grid) === 3) {
    return '#'
  }
  return newGrid[i][j]
}

function* conway(grid) {
  // ici j'ai pas mal galéré sur les pointeurs, c'est pour ça que j'instancie une newGrid et la
  // passe à toute les fonctions enforce*
  let nextGrid = Array(6).fill('.').map(line => Array(6).fill('.'))

  grid.map((line, k) => line.map((cell, l) => {
    nextGrid[k][l] = enforceOverpop(k, l, grid, nextGrid)
    nextGrid[k][l] = enforceUnderpop(k, l, grid, nextGrid)
    nextGrid[k][l] = enforceEquilibrium(k, l, grid, nextGrid)
    nextGrid[k][l] = enforceReproduction(k, l, grid, nextGrid)
  }))
  yield(nextGrid)
}

module.exports = conway
