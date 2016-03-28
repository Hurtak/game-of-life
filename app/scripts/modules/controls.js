// --- Config & Local state ----------------------------------------------------

const conf = {
  toggleCaptionAttribute: 'data-toggle-text',
  toggleButtonClass: 'button--active',
  intervalButtonSelectedClass: 'button-interval--active'
}

const dom = {
  getButtonStepEl: () => document.getElementById('button-step'),
  getButtonClearEl: () => document.getElementById('button-clear'),
  getButtonTimerToggleEl: () => document.getElementById('button-timer-toggle'),

  getIntervalsWrapperEl: () => document.getElementById('button-timer-intervals'),
  getButtonTimerIntervalEl: (value) => document.querySelector(`[${ conf.intervalButtonAttribute }="${ value }"`)
}

let previousState
let timer

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  previousState = store.getState()

  dom.getButtonStepEl().addEventListener('click', () => store.dispatch({type: 'TICK'}))
  dom.getButtonTimerToggleEl().addEventListener('click', () => store.dispatch({type: 'TOGGLE_TIMER'}))
  dom.getButtonClearEl().addEventListener('click', () => store.dispatch({type: 'CLEAR_WORLD'}))

  store.subscribe(() => { stateChangeHandler(store) })
}

const stateChangeHandler = (store) => {
  const currentState = store.getState()
  if (currentState.timer.enabled !== previousState.timer.enabled) {
    timerStateChanged(dom, conf)
    timer = currentState.timer.enabled ? startTimer(timer, store, currentState.timer.interval) : window.clearInterval(timer)
  }

  if (currentState.timer.interval !== previousState.timer.interval) {
    if (currentState.timer.enabled) {
      timer = window.clearInterval(timer)
      timer = startTimer(timer, store, currentState.timer.interval)
    }
  }

  previousState = currentState
}

// --- Pure functions ----------------------------------------------------------

const timerStateChanged = (dom, conf) => {
  const button = dom.getButtonTimerToggleEl()

  toggleElementCaption(button, conf.toggleCaptionAttribute)
  button.classList.toggle(conf.toggleButtonClass)
}

const startTimer = (timer, store, interval) => {
  return window.setInterval(() => {
    store.dispatch({type: 'TICK'})
  }, interval)
}

const toggleElementCaption = (element, attributeName) => {
  const currentCaption = element.innerHTML.trim()
  element.innerHTML = element.getAttribute(attributeName)
  element.setAttribute(attributeName, currentCaption)
}

// --- Export ------------------------------------------------------------------

export default init
