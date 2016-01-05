import { toggleElementCaption } from './utils/controls.js'

const conf = {
  buttonStepId: 'button-step',
  buttonTimerId: 'button-timer',
  toggleCaptionAttribute: 'data-toggle-text',
  timerIntervalMs: 100
}
let dom = {}

const init = (store) => {
  dom.buttonStepEl = document.getElementById(conf.buttonStepId)
  dom.buttonTimerEl = document.getElementById(conf.buttonTimerId)

  dom.buttonStepEl.addEventListener('click', () => {
    store.dispatch({type: 'TICK'})
  })
  // dom.buttonTimerEl.addEventListener('click', () => {
  //   store.dispatch({ type: 'TOGGLE_TIMER', interval: conf.timerIntervalMs})
  // })
}

const toggleTimerButtonCaption = () => {
  toggleElementCaption(dom.buttonTimerEl, conf.toggleCaptionAttribute)
}

export { init, toggleTimerButtonCaption }
