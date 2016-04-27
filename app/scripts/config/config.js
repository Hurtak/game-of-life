import cursorTypes from './config-cursors.js'

import * as cursorUtils from '../utils/cursor.js'
import * as worldUtils from '../utils/world.js'

// --- Config ------------------------------------------------------------------

const conf = {}

conf.canvas = {
  width: 1200, // px
  height: 600, // px
  cellColor: '#000'
}

conf.timer = {}
conf.timer.intervalValues = [1000, 500, 250, 100, 50, 25, 10, 0] // ms
conf.timer.initialInterval = conf.timer.intervalValues[2]

conf.world = {}
conf.world.sizes = [ // number of cells horizontally × vertically
  [conf.canvas.width / 40, conf.canvas.height / 40], // 40px cell size
  [conf.canvas.width / 20, conf.canvas.height / 20],
  [conf.canvas.width / 10, conf.canvas.height / 10],
  [conf.canvas.width / 5, conf.canvas.height / 5],
  [conf.canvas.width / 2, conf.canvas.height / 2],
  [conf.canvas.width / 1, conf.canvas.height / 1]
]
conf.world.initialSize = conf.world.sizes[2]

conf.cursor = {}
conf.cursor.types = cursorTypes
conf.cursor.initialCursorType = conf.cursor.types['Brushes']['1 cell']

// --- Initial world -----------------------------------------------------------

const randomCursor = cursorUtils.getRandomCursor(conf.cursor.types)
const randomCursorCentered = worldUtils.centerCursorToWorld(randomCursor, conf.world.initialSize)
const initialWorld = randomCursorCentered

// --- Initial app state -------------------------------------------------------

const initialAppState = {
  world: {
    cells: initialWorld,
    size: conf.world.initialSize,
    sizeValues: conf.world.sizes
  },
  cursor: {
    menuVisible: false,
    type: conf.cursor.initialCursorType,
    typeValues: conf.cursor.types
  },
  timer: {
    enabled: false,
    interval: conf.timer.initialInterval,
    intervalValues: conf.timer.intervalValues
  },
  stats: {
    visible: false,
    cells: initialWorld.length,
    generation: 0,
    recalculate: 0,
    redraw: 0
  },
  canvas: {
    width: conf.canvas.width,
    height: conf.canvas.height,
    cellColor: conf.canvas.cellColor
  }
}

// --- Export ------------------------------------------------------------------

export {
  initialAppState
}
