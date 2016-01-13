import * as world from './utils/world.js'

const offsetX = 27
const offsetY = 12
const initialWorld = [
  [1, 2], [2, 1], [2, 2], [2, 3], [3, 3]
].map(([x, y]) => [x + offsetX, y + offsetY])

const CELLS_X = 60
const CELLS_Y = 30

const initialState = {
  world: initialWorld,
  size: [CELLS_X, CELLS_Y],
  stats: {
    cells: initialWorld.length,
    generation: 0
  }
}

const addCell = (state, {x, y}) => {
  const newWorld = world.addCell(state.world, x, y)
  const cells = newWorld.length

  return Object.assign({}, state, {world: newWorld, stats: { cells, generation: state.stats.generation }})
}

const removeCell = (state, {x, y}) => {
  const newWorld = world.removeCell(state.world, x, y)
  const cells = newWorld.length

  return Object.assign({}, state, {world: newWorld, stats: { cells, generation: state.stats.generation }})
}

const toggleCell = (state, action) => {
  let cellExists = world.getCell(state.world, action.x, action.y)

  return cellExists ? removeCell(state, action) : addCell(state, action)
}

const tick = (state, action) => {
  let newWorld = world.tick(state.world || [])
  const [maxX, maxY] = state.size
  newWorld = world.clamp(newWorld, 0, maxX, 0, maxY)

  const worldEmpty = newWorld.length === 0
  const timerRunning = worldEmpty ? false : state.timerRunning
  const generation = state.stats.generation + 1
  const cells = newWorld.length

  return Object.assign({}, state, {
    world: newWorld,
    timerRunning,
    stats: { generation, cells }
  })
}

const clearWorld = (state, action) => {
  return Object.assign({}, state, {world: [], timerRunning: false, stats: {cells: 0, generation: 0}})
}

const toggleTimer = (state, action) => {
  return state.timerRunning ? stopTimer(state, action) : startTimer(state, action)
}

const startTimer = (state, action) => {
  return Object.assign({}, state, {timerRunning: true})
}

const stopTimer = (state, action) => {
  return Object.assign({}, state, {timerRunning: false})
}

const reducers = (state = initialState, action) => {
  console.log('DISPATCHING', action)
  switch (action.type) {
    case 'ADD_CELL': return addCell(state, action)
    case 'REMOVE_CELL': return removeCell(state, action)
    case 'TOGGLE_CELL': return toggleCell(state, action)
    case 'TICK': return tick(state, action)
    case 'CLEAR_WORLD': return clearWorld(state, action)
    case 'START_TIMER': return startTimer(state, action)
    case 'STOP_TIMER': return stopTimer(state, action)
    case 'TOGGLE_TIMER': return toggleTimer(state, action)
    default: return state
  }
}

export default reducers
