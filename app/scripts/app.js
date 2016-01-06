import { createStore } from 'redux'
import reducers from './reducers.js'

import canvas from './canvas.js'
import controls from './controls.js'

const store = createStore(reducers)

canvas(store)
controls(store)
