import { createStore } from 'redux'
import reducers from './reducers.js'

import canvas from './modules/canvas.js'
import controls from './modules/controls.js'
import worldSize from './modules/world-size.js'
import timer from './modules/timer.js'
import stats from './modules/stats.js'

const store = createStore(reducers)

canvas(store)
worldSize(store)
timer(store)
controls(store)
stats(store)
