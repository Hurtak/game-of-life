import slider from '../ui/slider.js'

// --- Config & Local state ----------------------------------------------------

const conf = {
  intervals: [0, 10, 25, 50, 100, 250, 500, 1000, 2000], // ms
  initialIntervalIndex: 6
}

const dom = {
  intervalsSlider: document.getElementById('timer-intervals-slider'),
  timerSwitch: document.getElementById('timer')
}

let previousState = {}
let timer

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  slider({
    targetEl: dom.intervalsSlider,
    items: conf.intervals.map(x => x + 'ms'),
    initialIndex: conf.initialIntervalIndex,
    callback: (index) => {
      store.dispatch({ type: 'CHANGE_TIMER_INTERVAL', interval: conf.intervals[index] })
    }
  })

  dom.timerSwitch.addEventListener('change', () => store.dispatch({type: 'TOGGLE_TIMER'}))
  store.subscribe(() => stateChangeHandler(store))
}

const stateChangeHandler = (store) => {
  const currentState = store.getState().timer
  if (currentState.enabled !== previousState.enabled) {
    timer = currentState.enabled
      ? startTimer(store, currentState.interval)
      : window.clearInterval(timer)
  }

  if (currentState.enabled && currentState.interval !== previousState.interval) {
    timer = window.clearInterval(timer)
    timer = startTimer(store, currentState.interval)
  }

  previousState = currentState
}

// --- Pure functions ----------------------------------------------------------

const startTimer = (store, interval) => {
  return window.setInterval(() => {
    store.dispatch({type: 'TICK'})
  }, interval)
}

// --- Export ------------------------------------------------------------------

export default init
