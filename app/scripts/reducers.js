import * as world from './utils/world.js'

// Initial state

// TODO: move state init into separate file
const offsetX = 27
const offsetY = 12
const initialWorld = [
  [1, 2], [2, 1], [2, 2], [2, 3], [3, 3]
].map(([x, y]) => [x + offsetX, y + offsetY])

const worldSizes = [
  [30, 15], // 40px
  [60, 30], // 20px
  [120, 60], // 10px
  [240, 120], // 5px
  [600, 300], // 2px
  [1200, 600] // 1px
]

const initialState = {
  world: initialWorld,
  size: {
    index: 1,
    dimensions: worldSizes[1]
  },
  timer: {
    enabled: false,
    interval: 100
  },
  stats: {
    cells: initialWorld.length,
    generation: 0,
    recalculate: 0,
    redraw: 0
  }
}

// Reducers

const alterCell = (state, {x, y}, addCell) => {
  const recalculationStart = Date.now()

  const newWorld = world[addCell ? 'addCell' : 'removeCell'](state.world, x, y)
  const cells = newWorld.length

  const recalculationDuration = Date.now() - recalculationStart

  return {
    ...state,
    world: newWorld,
    stats: {
      ...state.stats,
      cells,
      recalculate: recalculationDuration
    }
  }
}

const toggleCell = (state, action) => {
  let cellExists = world.getCell(state.world, action.x, action.y)

  return alterCell(state, action, !cellExists)
}

const tick = (state, action) => {
  const recalculationStart = Date.now()
  let newWorld = world.tick(state.world || [])
  const [maxX, maxY] = state.size.dimensions

  const clampIndent = 1
  newWorld = world.clamp(newWorld, 0 - clampIndent, maxX + clampIndent, 0 - clampIndent, maxY + clampIndent)

  const recalculationDuration = Date.now() - recalculationStart

  const generation = state.stats.generation + 1
  const cells = newWorld.length

  return {
    ...state,
    world: newWorld,
    stats: {
      ...state.stats,
      generation,
      cells,
      recalculate: recalculationDuration
    }
  }
}

const clearWorld = (state, action) => {
  return {
    ...state,
    world: [],
    timer: {
      ...state.timer,
      enabled: false
    },
    stats: {
      ...state.stats,
      cells: 0,
      generation: 0,
      recalculate: 0
    }
  }
}

const redraw = (state, action) => {
  return {
    ...state,
    stats: {
      ...state.stats,
      redraw: action.duration
    }
  }
}

const changeWorldSize = (state, action) => {
  const newDimensions = worldSizes[action.worldSizeIndex]

  return {
    ...state,
    world: world.resize(state.world, state.size.dimensions, newDimensions),
    size: {
      ...state.size,
      index: action.worldSizeIndex,
      dimensions: newDimensions
    }
  }
}

const changeTimerInterval = (state, action) => {
  return {
    ...state,
    timer: {
      ...state.timer,
      interval: action.interval
    }
  }
}

const toggleTimer = (state, action) => state.timer.enabled ? stopTimer(state, action) : startTimer(state, action)
const startTimer = (state, action) => ({ ...state, timer: { ...state.timer, enabled: true } })
const stopTimer = (state, action) => ({ ...state, timer: { ...state.timer, enabled: false } })

const reducers = (state = initialState, action) => {
  console.log('DISPATCHING', action)
  switch (action.type) {
    case 'ADD_CELL': return alterCell(state, action, true)
    case 'REMOVE_CELL': return alterCell(state, action, false)
    case 'TOGGLE_CELL': return toggleCell(state, action)
    case 'TICK': return tick(state, action)
    case 'REDRAW': return redraw(state, action)
    case 'CLEAR_WORLD': return clearWorld(state, action)
    case 'CHANGE_WORLD_SIZE': return changeWorldSize(state, action)
    case 'START_TIMER': return startTimer(state, action)
    case 'STOP_TIMER': return stopTimer(state, action)
    case 'TOGGLE_TIMER': return toggleTimer(state, action)
    case 'CHANGE_TIMER_INTERVAL': return changeTimerInterval(state, action)
    default: return state
  }
}

export default reducers
