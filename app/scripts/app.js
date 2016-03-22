import { createStore } from 'redux'
import reducers from './reducers.js'

import canvas from './modules/canvas.js'
import controls from './modules/controls.js'
import stats from './modules/stats.js'

const store = createStore(reducers)

canvas(store)
controls(store)
stats(store)
