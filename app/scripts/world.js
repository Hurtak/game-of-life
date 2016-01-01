const getNeighbourCount = (world, x, y) => {
  const neighbours = getNeighboursCoordinates(x, y)
  return neighbours.reduce((p, [cellX, cellY]) => p + (getCell(world, cellX, cellY) ? 1 : 0), 0)
}

const getCell = (world, x, y) => {
  return world.find(([cellX, cellY]) => cellX === x && cellY === y) || false
}

const addCell = (world, x, y) => {
  const cellExists = getCell(world, x, y)
  return cellExists ? world : [...world, [x, y]]
}

const removeCell = (world, x, y) => {
  return world.filter(([cellX, cellY]) => !(cellX === x && cellY === y))
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

const tick = (world) => {
  let newWorld = []
  let neighbours = []

  world.forEach(([x, y]) => {
    const neighbourCount = getNeighbourCount(world, x, y)

    const neighbourCoordinates = getNeighboursCoordinates(x, y)
    neighbourCoordinates.forEach(neighbour => {
      neighbours = addCell(neighbours, neighbour[0], neighbour[1])
    })

    // keep cells with 2-3 neighbourCount
    if (neighbourCount === 2 || neighbourCount === 3) {
      newWorld = addCell(newWorld, x, y)
    }
  })

  // check neighbours of alive cells to see if they have 3 living neighbours, in which case they should come alive
  neighbours.forEach(([x, y]) => {
    const neighbourCount = getNeighbourCount(world, x, y)
    if (neighbourCount === 3) {
      newWorld = addCell(newWorld, x, y)
    }
  })

  return newWorld
}

export {addCell, removeCell, tick}
