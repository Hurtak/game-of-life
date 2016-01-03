import stateHandlers from './state-handlers.js'
import { init as stateInit, dispatch } from './state.js'

import { init as canvasInit } from './canvas.js'
import { init as controlsInit } from './controls.js'

const offset = 7
const initialWorld = [
  [1, 2], [2, 1], [2, 2], [2, 3], [3, 3]
].map(cell => cell.map(coords => coords + offset))

canvasInit()
controlsInit()

stateInit(stateHandlers, {world: initialWorld})
dispatch('INIT')
