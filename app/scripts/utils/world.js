// --- Public functions --------------------------------------------------------

export const getCell = (world, x, y) => {
  return world.find(([cellX, cellY]) => cellX === x && cellY === y) || false
}

export const addCell = (world, x, y) => {
  const cellExists = getCell(world, x, y)
  return cellExists ? world : [...world, [x, y]]
}

export const removeCell = (world, x, y) => {
  return world.filter(([cellX, cellY]) => !(cellX === x && cellY === y))
}

export const tick = (world) => {
  let newWorld = []

  // determine if currently living cells will stay alive
  world.filter(([x, y]) => isAliveOnNextTick(world, x, y))
    .forEach(([x, y]) => { newWorld = addCell(newWorld, x, y) })

  // determine if neighbours of currently living cells will come to life
  world.map(([x, y]) => getNeighboursCoordinates(x, y))
    .reduce((a, b) => a.concat(b), [])
    .filter(([x, y]) => isAliveOnNextTick(world, x, y))
    .forEach(([x, y]) => { newWorld = addCell(newWorld, x, y) })

  return newWorld
}

export const clamp = (world, minX, maxX, minY, maxY) => {
  return world.filter(([x, y]) => x >= minX && x <= maxX && y >= minY && y <= maxY)
}

export const resize = (world, [previousWidth, previousHeight], [currentWidth, currentHeight]) => {
  const xOffset = Math.round((currentWidth - previousWidth) / 2)
  const yOffset = Math.round((currentHeight - previousHeight) / 2)

  return world.map(([x, y]) => [x + xOffset, y + yOffset])
}

// --- Local functions ----------------------------------------------------------

const getNeighbourCount = (world, x, y) => {
  const neighbours = getNeighboursCoordinates(x, y)
  return neighbours.reduce((p, [cellX, cellY]) => p + (getCell(world, cellX, cellY) ? 1 : 0), 0)
}

const getNeighboursCoordinates = (x, y) => {
  const neighbours = []
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue
      neighbours.push([i + x, j + y])
    }
  }

  return neighbours
}

const isAliveOnNextTick = (world, x, y) => {
  const neighbourCount = getNeighbourCount(world, x, y)
  if (neighbourCount === 3) return true

  const isAlive = getCell(world, x, y)
  return isAlive && neighbourCount === 2
}
