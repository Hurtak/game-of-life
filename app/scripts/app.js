import { createStore } from 'redux'
import reducers from './reducers.js'

import { init as canvasInit } from './canvas.js'
import { init as controlsInit } from './controls.js'

const store = createStore(reducers)

canvasInit(store)
// controlsInit(store)
