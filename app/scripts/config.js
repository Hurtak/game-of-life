import * as cursor from './utils/cursor.js'
import cursorStrings from './config-cursors.js'

// --- Config ------------------------------------------------------------------

const conf = {}

conf.canvas = {
  width: 1200, // px
  height: 600, // px
  cellColor: '#000'
}

conf.timer = {}
conf.timer.intervalValues = [0, 10, 25, 50, 100, 250, 500, 1000, 2000], // ms
conf.timer.initialInterval = conf.timer.intervalValues[5]

conf.world = {}
conf.world.dimensions = [ // number of cells horizontally × vertically
  [conf.canvas.width / 40, conf.canvas.height / 40], // 40px cell size
  [conf.canvas.width / 20, conf.canvas.height / 20],
  [conf.canvas.width / 10, conf.canvas.height / 10],
  [conf.canvas.width / 5, conf.canvas.height / 5],
  [conf.canvas.width / 2, conf.canvas.height / 2],
  [conf.canvas.width / 1, conf.canvas.height / 1]
]
conf.world.initialDimenson = conf.world.dimensions[2]

conf.cursor = {}
conf.cursor.types = cursor.convertObjectOfCursors(cursorStrings)
conf.cursor.initialCursorType = conf.cursor.types['Brushes']['1 cell']

// --- Initial world -----------------------------------------------------------

// 1. get all cursors
const ignoredCursorTypes = [
  'Brushes',
  'Still lifes'
]

const allCursors = Object.keys(conf.cursor.types)
  .filter(key => !ignoredCursorTypes.includes(key))
  .map(key => conf.cursor.types[key])
  .map(group => Object.keys(group).map(key => group[key]))
  .reduce((a, b) => a.concat(b))

// 2. choose one randomly
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomCursor = allCursors[getRandomInt(0, allCursors.length - 1)]

// 3. shift this cursor coordinates so it is in the center of the world
const cursorWidth = randomCursor.reduce((width, [x, _]) => x > width ? x : width, 0) + 1
const cursorHeight = randomCursor.reduce((height, [_, y]) => y > height ? y : height, 0) + 1

const [worldWidth, worldHeight] = conf.world.initialDimenson

const offsetX = Math.round((worldWidth / 2) - (cursorWidth / 2))
const offsetY = Math.round((worldHeight / 2) - (cursorHeight / 2))
const randomCursorCentered = randomCursor.map(([x, y]) => [x + offsetX, y + offsetY])

const initialWorld = randomCursorCentered

// --- Initial app state -------------------------------------------------------

const initialAppState = {
  world: initialWorld,
  worldDimension: conf.world.initialDimenson,
  worldDimensionValues: conf.world.dimensions,
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
  conf,
  initialAppState
}
