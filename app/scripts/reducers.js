import * as world from './utils/world.js'

const offset = 7
const initialWorld = [
  [1, 2], [2, 1], [2, 2], [2, 3], [3, 3]
].map(cell => cell.map(coords => coords + offset))

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

const reducers = (state = initialState, action) => {
  console.log('DISPATCHING', action)
  switch (action.type) {
    case 'ADD_CELL': return addCell(state, action)
    case 'REMOVE_CELL': return removeCell(state, action)
    case 'TOGGLE_CELL': return toggleCell(state, action)
    case 'TICK': return tick(state, action)
    default: return state
  }
}

export default reducers
