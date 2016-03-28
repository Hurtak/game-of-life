import slider from '../ui/slider.js'

// --- Config & Local state ----------------------------------------------------

const conf = {
  intervals: [
    0, // ms
    10,
    25,
    50,
    100,
    250,
    500,
    1000,
    2000
  ],
  initialIntervalIndex: 6
}

const dom = {
  slider: document.getElementById('timer-intervals-slider')
}

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  slider({
    targetEl: dom.slider,
    items: conf.intervals.map(x => x + 'ms'),
    initialIndex: conf.initialIntervalIndex,
    callback: (index) => {
      store.dispatch({ type: 'CHANGE_TIMER_INTERVAL', interval: conf.intervals[index] })
    }
  })
}

// --- Export ------------------------------------------------------------------

export default init
