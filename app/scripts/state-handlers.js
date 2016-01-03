import * as world from './world.js'
import * as canvas from './canvas.js'
import * as controls from './controls.js'

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
    console.time('state')
    state.world = world.tick(state.world)
    console.timeEnd('state')
    console.time('redraw')
    canvas.drawAllCells(state.world)
    console.timeEnd('redraw')

    return state
  },
  'TOGGLE_TIMER': (state) => {
    controls.toggleTimerButtonCaption()
    state.timerRunning = !state.timerRunning
    return state
  }
}
