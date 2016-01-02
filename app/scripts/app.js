import * as state from './state.js'
import * as world from './world.js'
import * as canvas from './canvas.js'

const stateHandler = {
  'ADD_CELL': (state, {x, y}) => {
    state.world = world.addCell(state.world, x, y)
    return {state}
  },
  'REMOVE_CELL': (state, {x, y}) => {
    state.world = world.removeCell(state.world, x, y)
    return {state}
  },
  'TOGGLE_CELL': (state, {x, y}) => {
    let cellExists = (world.getCell(state.world, x, y))
    if (cellExists) {
      state.world = world.removeCell(state.world, x, y)
    } else {
      state.world = world.addCell(state.world, x, y)
    }
    return {state, data: {drawCell: !cellExists, x, y}}
  },
  'TICK': (state) => {
    state.world = world.tick(state.world)
    return {state, data: {world: state.world}}
  }
}

state.init(stateHandler, {world: []})

canvas.init('canvas')

document.getElementById('button-step').addEventListener('click', () => {
  state.dispatch('TICK')
})
