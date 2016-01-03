import { dispatch } from './state.js'
import { toggleElementCaption } from './utils/controls.js'

const conf = {
  buttonStepId: 'button-step',
  buttonTimerId: 'button-timer',
  toggleCaptionAttribute: 'data-toggle-text',
  timerIntervalMs: 100
}
let dom = {}

const init = () => {
  dom.buttonStepEl = document.getElementById(conf.buttonStepId)
  dom.buttonTimerEl = document.getElementById(conf.buttonTimerId)

  dom.buttonStepEl.addEventListener('click', () => {
    dispatch('TICK')
  })
  dom.buttonTimerEl.addEventListener('click', () => {
    dispatch('TOGGLE_TIMER', {interval: conf.timerIntervalMs})
  })
}

const toggleTimerButtonCaption = () => {
  toggleElementCaption(dom.buttonTimerEl, conf.toggleCaptionAttribute)
}

export { init, toggleTimerButtonCaption }
