import './polyfills/polyfills.js'

import { createStore } from 'redux'
import reducers from './reducers.js'

import canvas from './modules/canvas.js'
import world from './modules/world.js'
import timer from './modules/timer.js'
import cursor from './modules/cursor.js'
import stats from './modules/stats.js'

// import benchmark from './benchmark/benchmark.js'
// benchmark()

const store = createStore(reducers)

canvas(store)
world(store)
timer(store)
cursor(store)
stats(store)
