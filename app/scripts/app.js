import stateHandlers from './state-handlers.js'
import { init as stateInit } from './state.js'

import { init as canvasInit } from './canvas.js'
import { init as buttonsInit } from './buttons.js'

stateInit(stateHandlers, {world: []})
canvasInit()
buttonsInit()
