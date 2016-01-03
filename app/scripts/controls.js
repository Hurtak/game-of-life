import * as state from './state.js'

const conf = {
  buttonStepId: 'button-step',
  buttonTimerId: 'button-timer',
  toggleCaptionAttribute: 'data-toggle-text',
  timerIntervalMs: 100
}
let dom = {}
let timer

const init = () => {
  dom.buttonStepEl = document.getElementById(conf.buttonStepId)
  dom.buttonTimerEl = document.getElementById(conf.buttonTimerId)

  dom.buttonStepEl.addEventListener('click', buttonStepClick)
  dom.buttonTimerEl.addEventListener('click', () => {
    state.dispatch('TOGGLE_TIMER')
    timer = buttonTimerClick(timer, conf.timerIntervalMs)
  })
}

const buttonStepClick = () => { state.dispatch('TICK') }

const buttonTimerClick = (timer, interval) => {
  if (timer) {
    timer = clearInterval(timer)
  } else {
    timer = setInterval(() => {
      state.dispatch('TICK')
    }, interval)
  }

  return timer
}

const toggleElementCaption = (element, attributeName) => {
  const currentCaption = element.innerHTML.trim()
  element.innerHTML = element.getAttribute(attributeName)
  element.setAttribute(attributeName, currentCaption)
}

const toggleTimerButtonCaption = () => {
  toggleElementCaption(dom.buttonTimerEl, conf.toggleCaptionAttribute)
}

export { init, toggleTimerButtonCaption }
