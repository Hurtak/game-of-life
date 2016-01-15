import * as world from './utils/world.js'

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
  size: worldSizes[1],
  stats: {
    cells: initialWorld.length,
    generation: 0,
    recalculate: 0,
    redraw: 0
  }
}

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
  const [maxX, maxY] = state.size
  newWorld = world.clamp(newWorld, 0, maxX, 0, maxY)

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
    timerRunning: false,
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

const toggleTimer = (state, action) => state.timerRunning ? stopTimer(state, action) : startTimer(state, action)
const startTimer = (state, action) => ({ ...state, timerRunning: true })
const stopTimer = (state, action) => ({ ...state, timerRunning: false })

const reducers = (state = initialState, action) => {
  console.log('DISPATCHING', action)
  switch (action.type) {
    case 'ADD_CELL': return alterCell(state, action, true)
    case 'REMOVE_CELL': return alterCell(state, action, false)
    case 'TOGGLE_CELL': return toggleCell(state, action)
    case 'TICK': return tick(state, action)
    case 'REDRAW': return redraw(state, action)
    case 'CLEAR_WORLD': return clearWorld(state, action)
    case 'START_TIMER': return startTimer(state, action)
    case 'STOP_TIMER': return stopTimer(state, action)
    case 'TOGGLE_TIMER': return toggleTimer(state, action)
    default: return state
  }
}

export default reducers
