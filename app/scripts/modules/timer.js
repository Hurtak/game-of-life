import { conf } from '../config.js'
import slider from '../ui/slider.js'

// --- Config & Local state ----------------------------------------------------

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
    items: conf.timer.intervals.map(x => x + 'ms'),
    initialIndex: conf.timer.initialIndex,
    callback: (index) => {
      store.dispatch({ type: 'CHANGE_TIMER_INTERVAL', interval: conf.timer.intervals[index] })
    }
  })

  store.subscribe(() => stateHandler(store))
  dom.timerSwitch.addEventListener('change', () => store.dispatch({type: 'TOGGLE_TIMER'}))
}

const stateHandler = (store) => {
  const currentState = store.getState().timer
  if (currentState.enabled !== previousState.enabled) {
    timer = currentState.enabled
      ? startTimer(store, currentState.interval)
      : window.clearInterval(timer)

    dom.timerSwitch.checked = currentState.enabled
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
