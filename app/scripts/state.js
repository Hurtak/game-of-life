import { createStore } from 'redux'
import * as world from './world.js'

const store = createStore(reducers)

const reducers = (state = {}, action) => {
  state.world = state.world || []

  switch (action.type) {
    case 'ADD_CELL':
      state.world = world.addCell(state.world, action.x, action.y)
      return state
    case 'REMOVE_CELL':
      state.world = world.removeCell(state.world, action.x, action.y)
      return state
    default:
      return state
  }
}

export default store
