import stateHandlers from './state-handlers.js'
import { init as stateInit } from './state.js'

import { init as canvasInit } from './canvas.js'
import { init as controlsInit } from './controls.js'

stateInit(stateHandlers, {world: []})
canvasInit()
controlsInit()
