import * as world from './utils/world.js'

const offsetX = 27
const offsetY = 12
const initialWorld = [
  [1, 2], [2, 1], [2, 2], [2, 3], [3, 3]
].map(([x, y]) => [x + offsetX, y + offsetY])

const initialState = {
  world: initialWorld
}

const addCell = (state, {x, y}) => {
  const newWorld = world.addCell(state.world, x, y)

  return Object.assign({}, state, {world: newWorld})
}

const removeCell = (state, {x, y}) => {
  const newWorld = world.removeCell(state.world, x, y)

  return Object.assign({}, state, {world: newWorld})
}

const toggleCell = (state, action) => {
  let cellExists = world.getCell(state.world, action.x, action.y)

  return cellExists ? removeCell(state, action) : addCell(state, action)
}

const tick = (state, action) => {
  const newWorld = world.tick(state.world || [])

  return Object.assign({}, state, {world: newWorld})
}

const clearWorld = (state, action) => {
  return Object.assign({}, state, {world: []})
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
