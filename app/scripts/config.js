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
  initialIndex: 6 // TODO: maybe put here directly the value instead of index??
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
  initialIndex: 1 // TODO: maybe put here directly the value instead of index??
}

conf.cursor = {
  initialCursor: { // TODO: maybe put here directly the value instead of index??
    group: 'Spaceships',
    name: 'Glider'
  },
  types: cursor.convertObjectOfCursors({
    'Still lifes': {
      'Block': `
        ■ ■
        ■ ■
      `,
      'Beehive': `
          ■ ■
        ■     ■
          ■ ■
      `,
      'Loaf': `
          ■ ■
        ■     ■
          ■   ■
            ■
      `,
      'Boat': `
        ■ ■
        ■   ■
          ■
      `
    },

    'Oscillators': {
      'Blinker': `
        ■ ■ ■
      `,
      'Toad': `
          ■ ■ ■
        ■ ■ ■
      `,
      'Beacon': `
        ■ ■
        ■ ■
            ■ ■
            ■ ■
      `
    },

    'Spaceships': {
      'Glider': `
          ■
            ■
        ■ ■ ■
      `
    }
  })
}

// --- Initial state -----------------------------------------------------------

// TODO: refactor
const offsetX = 27
const offsetY = 12
const initialWorld = [
  [1, 2], [2, 1], [2, 2], [2, 3], [3, 3]
].map(([x, y]) => [x + offsetX, y + offsetY])

const initialAppState = {
  world: initialWorld,
  worldDimensions: conf.world.dimensions[conf.world.initialIndex], // TODO: maybe put whole set of values from config in here?
  cursor: {
    menuVisible: false,
    type: conf.cursor.types[conf.cursor.initialCursor.group][conf.cursor.initialCursor.name]
  },
  timer: {
    enabled: false,
    interval: conf.timer.intervals[conf.timer.initialIndex] // TODO: maybe put whole set of values from config in here?
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
