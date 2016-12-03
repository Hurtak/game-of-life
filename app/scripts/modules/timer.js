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
  const state = store.getState().timer
  previousState = state

  slider({
    targetEl: dom.intervalsSlider,
    leftButton: '<div class="icon icon--timer-slower">Slower</div>',
    rightButton: '<div class="icon icon--timer-faster">Faster</div>',
    items: state.intervalValues.map(x => x + 'ms'),
    initialIndex: state.intervalValues.indexOf(state.interval),
    callback: (index) => {
      store.dispatch({ type: 'TIMER_INTERVAL_CHANGE', interval: state.intervalValues[index] })
    }
  })

  store.subscribe(() => stateHandler(store))
  dom.timerSwitch.addEventListener('change', () => store.dispatch({ type: 'TIMER_TOGGLE' }))
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
    store.dispatch({ type: 'WORLD_TICK' })
  }, interval)
}

// --- Export ------------------------------------------------------------------

export default init
