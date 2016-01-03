import * as world from './utils/world.js'
import * as canvas from './canvas.js'
import * as controls from './controls.js'
import { dispatch } from './state.js'

const key = 'APP_STATE'

const saveState = (state) => {
  const string = JSON.stringify(state)
  window.localStorage.setItem(key, string)
  return string
}

const restoreState = () => {
  return JSON.parse(window.localStorage.getItem(key)) || {}
}

const startTimer = (state, {interval}) => {
  state.timer = {}
  state.timer.interval = interval
  state.timer.timer = window.setInterval(() => {
    dispatch('TICK')
  }, interval)
  return state
}

export default {
  'INIT': (state) => {
    state = Object.assign(state, restoreState())
    canvas.drawAllCells(state.world)
    if (state.timer) {
      controls.toggleTimerButtonCaption()
      state = startTimer(state, state.timer.interval)
    }

    return state
  },
  'ADD_CELL': (state, {x, y}) => {
    state.world = world.addCell(state.world, x, y)
    canvas.drawCell(x, y)
    saveState(state)

    return state
  },
  'REMOVE_CELL': (state, {x, y}) => {
    state.world = world.removeCell(state.world, x, y)
    canvas.clearCell(x, y)
    saveState(state)

    return state
  },
  'TOGGLE_CELL': (state, {x, y}) => {
    let cellExists = world.getCell(state.world, x, y)
    saveState(state)

    return dispatch(cellExists ? 'REMOVE_CELL' : 'ADD_CELL', {x, y})
  },
  'TICK': (state) => {
    console.time('state')
    state.world = world.tick(state.world || [])
    console.timeEnd('state')
    console.time('redraw')
    canvas.drawAllCells(state.world)
    console.timeEnd('redraw')
    saveState(state)

    return state
  },
  'START_TIMER': (state, {interval}) => {
    state = startTimer(state, {interval})
    saveState(state)

    return state
  },
  'STOP_TIMER': (state) => {
    window.clearInterval(state.timer.timer)
    delete state.timer
    saveState(state)

    return state
  },
  'TOGGLE_TIMER': (state, {interval}) => {
    controls.toggleTimerButtonCaption()
    if (state.timer) {
      return dispatch('STOP_TIMER')
    } else {
      return dispatch('START_TIMER', {interval})
    }
  }
}
