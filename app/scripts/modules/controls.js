// --- Config & Local state ----------------------------------------------------

const conf = {
  toggleCaptionAttribute: 'data-toggle-text',
  toggleButtonClass: 'button--active',
  intervalButtonAttribute: 'data-interval',
  intervalButtonSelectedClass: 'button-interval--active'
}

const dom = {
  getButtonStepEl: () => document.getElementById('button-step'),
  getButtonClearEl: () => document.getElementById('button-clear'),
  getButtonTimerToggleEl: () => document.getElementById('button-timer-toggle'),

  getIntervalsWrapperEl: () => document.getElementById('button-timer-intervals'),
  getButtonTimerIntervalEl: (value) => document.querySelector(`[${ conf.intervalButtonAttribute }="${ value }"`),
  getSelectedButtonTimerIntervalEl: () => dom.getIntervalsWrapperEl().querySelector(`.${ conf.toggleButtonClass }`)
}

let previousState
let timer

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  previousState = store.getState()

  timerIntervalChanged(dom, conf, previousState.timer.interval)

  dom.getButtonStepEl().addEventListener('click', () => store.dispatch({type: 'TICK'}))
  dom.getButtonTimerToggleEl().addEventListener('click', () => store.dispatch({type: 'TOGGLE_TIMER'}))
  dom.getButtonClearEl().addEventListener('click', () => store.dispatch({type: 'CLEAR_WORLD'}))
  dom.getIntervalsWrapperEl().addEventListener('click', (e) => intervalChangeButtonClick(e.target, store, conf.intervalButtonAttribute))

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
    timerIntervalChanged(dom, conf, currentState.timer.interval)
  }

  previousState = currentState
}

// --- Pure functions ----------------------------------------------------------

const intervalChangeButtonClick = (clickedEl, store, attributeName) => {
  if (!clickedEl.hasAttribute(attributeName)) return
  const interval = Number(clickedEl.getAttribute(attributeName))

  store.dispatch({type: 'CHANGE_TIMER_INTERVAL', interval})
}

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

const timerIntervalChanged = (dom, conf, interval) => {
  const previouslySelectedButton = dom.getSelectedButtonTimerIntervalEl()
  if (previouslySelectedButton) {
    previouslySelectedButton.classList.remove(conf.toggleButtonClass)
  }
  const selectedButton = dom.getButtonTimerIntervalEl(interval)
  selectedButton.classList.add(conf.toggleButtonClass)
}

const toggleElementCaption = (element, attributeName) => {
  const currentCaption = element.innerHTML.trim()
  element.innerHTML = element.getAttribute(attributeName)
  element.setAttribute(attributeName, currentCaption)
}

// --- Export ------------------------------------------------------------------

export default init
