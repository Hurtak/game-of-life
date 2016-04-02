import * as cursor from './utils/cursor.js'

// --- Config ------------------------------------------------------------------

const conf = {}

conf.canvas = {
  width: 1200, // px
  height: 600, // px
  cellColor: '#000'
}

conf.timer = {
  intervals: [0, 10, 25, 50, 100, 250, 500, 1000, 2000], // ms
  initialIndex: 6
}

conf.world = {
  dimensions: [ // number of cells horizontally × vertically
    [conf.canvas.width / 40, conf.canvas.height / 40], // 40px cell size
    [conf.canvas.width / 20, conf.canvas.height / 20],
    [conf.canvas.width / 10, conf.canvas.height / 10],
    [conf.canvas.width / 5, conf.canvas.height / 5],
    [conf.canvas.width / 2, conf.canvas.height / 2],
    [conf.canvas.width / 1, conf.canvas.height / 1]
  ],
  initialIndex: 1
}

conf.cursor = {
  initialIndex: 0,
  types: cursor.cursorStringsToCoordinates([
    `
    ■
    `,
    `
    ■ ■
    ■ ■
    `,
    `
      ■
    ■ ■ ■
      ■
    `,
    `
        ■
      ■ ■ ■
    ■ ■ ■ ■ ■
      ■ ■ ■
        ■
    `,
    `
      ■ ■
    ■ ■
      ■
    `
  ])
}

console.log(conf.cursor.types)

// --- Initial state -----------------------------------------------------------

// TODO: refactor
const offsetX = 27
const offsetY = 12
const initialWorld = [
  [1, 2], [2, 1], [2, 2], [2, 3], [3, 3]
].map(([x, y]) => [x + offsetX, y + offsetY])

const initialAppState = {
  world: initialWorld,
  worldDimensions: conf.world.dimensions[conf.world.initialIndex],
  timer: {
    enabled: false,
    interval: conf.timer.intervals[conf.timer.initialIndex]
  },
  stats: {
    cells: initialWorld.length,
    generation: 0,
    recalculate: 0,
    redraw: 0
  }
}

// --- Export ------------------------------------------------------------------

export {
  conf,
  initialAppState
}
