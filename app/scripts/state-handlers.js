import * as world from './world.js'
import * as canvas from './canvas.js'

export default {
  'ADD_CELL': (state, {x, y}) => {
    state.world = world.addCell(state.world, x, y)
    canvas.drawCell(x, y)

    return state
  },
  'REMOVE_CELL': (state, {x, y}) => {
    state.world = world.removeCell(state.world, x, y)
    canvas.clearCell(x, y)

    return state
  },
  'TOGGLE_CELL': (state, {x, y}) => {
    let cellExists = world.getCell(state.world, x, y)
    if (cellExists) {
      state.world = world.removeCell(state.world, x, y)
      canvas.clearCell(x, y)
    } else {
      state.world = world.addCell(state.world, x, y)
      canvas.drawCell(x, y)
    }

    return state
  },
  'TICK': (state) => {
    state.world = world.tick(state.world)
    canvas.drawAllCells(state.world)

    return state
  }
}
