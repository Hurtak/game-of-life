import { createStore } from 'redux'
import reducers from './reducers.js'

import canvas from './modules/canvas.js'
import controls from './modules/controls.js'
import worldSize from './modules/world-size.js'
import stats from './modules/stats.js'

import slider from './ui/slider.js'

const store = createStore(reducers)

canvas(store)
worldSize(store)
controls(store)
stats(store)

slider({
  sliderEl: document.querySelector('#slider')
})
