/*
 * Config
 */

const conf = {
  toggleCaptionAttribute: 'data-toggle-text',
  toggleButtonClass: 'button--active',
  timerIntervalMs: 100
}

const dom = {
  getButtonStepEl: () => document.getElementById('button-step'),
  getButtonClearEl: () => document.getElementById('button-clear'),
  getButtonTimerToggleEl: () => document.getElementById('button-timer-toggle'),
  getButtonTimerIntervalEl: (interval) => document.getElementById(`button-timer-${ interval }ms`)
}

/*
 * Local state
 */

let previousState
let timer

/*
 * Main methods
 */

const init = (store) => {
  previousState = store.getState()

  dom.getButtonStepEl().addEventListener('click', () => { store.dispatch({type: 'TICK'}) })
  dom.getButtonTimerToggleEl().addEventListener('click', () => { store.dispatch({type: 'TOGGLE_TIMER'}) })
  dom.getButtonClearEl().addEventListener('click', () => { store.dispatch({type: 'CLEAR_WORLD'}) })
  store.subscribe(() => { stateHandler(store) })
}

const stateHandler = (store) => {
  const currentState = store.getState()
  if (currentState.timer.enabled !== previousState.timer.enabled) {
    timer = timerStateChanged(timer, store, dom, conf)
  }

  previousState = currentState
}

/*
 * Pure utils functions
 */

const timerStateChanged = (timer, store, dom, conf) => {
  const button = dom.getButtonTimerToggleEl()

  toggleElementCaption(button, conf.toggleCaptionAttribute)
  button.classList.toggle(conf.toggleButtonClass)

  return timer ? clearTimeout(timer) : setInterval(() => {
    store.dispatch({type: 'TICK'})
  }, conf.timerIntervalMs)
}

const toggleElementCaption = (element, attributeName) => {
  const currentCaption = element.innerHTML.trim()
  element.innerHTML = element.getAttribute(attributeName)
  element.setAttribute(attributeName, currentCaption)
}

/**
 * Export
 */

export default init
