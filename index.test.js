const conway = require('./index');

// first round
// ....##
// .####.
// ....#.

// next round:
// ..#.##
// ..#...
// ..#.#.

const initGrid = () => {
  const emptyGrid = Array(6).fill('.').map(line => Array(6).fill('.'))
  emptyGrid[0][4] = '#'
  emptyGrid[0][5] = '#'
  emptyGrid[1][1] = '#'
  emptyGrid[1][2] = '#'
  emptyGrid[1][3] = '#'
  emptyGrid[1][4] = '#'
  emptyGrid[2][4] = '#'

  return emptyGrid
}

it('should respect rule of overpop', () => {
  const grid = initGrid()
  const generator = conway(grid)
  expect(generator.next(grid).value[1][3]).toBe('.')
})

it('should respect rule of underpop', () => {
  const grid = initGrid()
  const generator = conway(grid)
  expect(generator.next(grid).value[1][1]).toBe('.')
})

it('should respect rule of equilibrium', () => {
  const grid = initGrid()
  const generator = conway(grid)
  expect(generator.next(grid).value[2][1]).toBe('.')
})

it('should respect rule of reproduction', () => {
  const grid = initGrid()
  const generator = conway(grid)
  expect(generator.next(grid).value[2][2]).toBe('#')
})
