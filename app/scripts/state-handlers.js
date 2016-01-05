// import * as world from './utils/world.js'
// import * as canvas from './canvas.js'
// import * as controls from './controls.js'
//
//
// export default {
//   'ADD_CELL': (state, {x, y}) => {
//     state.world = world.addCell(state.world, x, y)
//     canvas.drawCell(x, y)
//
//     return state
//   },
//   'REMOVE_CELL': (state, {x, y}) => {
//     state.world = world.removeCell(state.world, x, y)
//     canvas.clearCell(x, y)
//
//     return state
//   },
//   'TOGGLE_CELL': (state, {x, y}) => {
//     let cellExists = world.getCell(state.world, x, y)
//
//     return dispatch(cellExists ? 'REMOVE_CELL' : 'ADD_CELL', {x, y})
//   },
//   'TICK': (state) => {
//     console.time('state')
//     state.world = world.tick(state.world || [])
//     console.timeEnd('state')
//     console.time('redraw')
//     canvas.drawAllCells(state.world)
//     console.timeEnd('redraw')
//
//     return state
//   },
//   'START_TIMER': (state, {interval}) => {
//     state = startTimer(state, {interval})
//
//     return state
//   },
//   'STOP_TIMER': (state) => {
//     window.clearInterval(state.timer.timer)
//     delete state.timer
//
//     return state
//   },
//   'TOGGLE_TIMER': (state, {interval}) => {
//     controls.toggleTimerButtonCaption()
//     if (state.timer) {
//       return dispatch('STOP_TIMER')
//     } else {
//       return dispatch('START_TIMER', {interval})
//     }
//   }
// }
