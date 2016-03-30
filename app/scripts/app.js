import { createStore } from 'redux'

import reducers from './reducers.js'

import canvas from './modules/canvas.js'
import world from './modules/world-size.js'
import timer from './modules/timer.js'
import cursor from './modules/cursor.js'
import stats from './modules/stats.js'

import x from './utils/cursor.js'
x()

const store = createStore(reducers)

canvas(store)
world(store)
timer(store)
cursor(store)
stats(store)
