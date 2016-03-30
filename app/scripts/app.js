import { createStore } from 'redux'
import reducers from './reducers.js'

import canvas from './modules/canvas.js'
import world from './modules/world-size.js'
import timer from './modules/timer.js'
import stats from './modules/stats.js'

const store = createStore(reducers)

canvas(store)
world(store)
timer(store)
stats(store)
