import * as state from './state.js'

const conf = {
  buttonStepId: 'button-step',
  buttonTimerId: 'button-timer',
  timerIntervalMs: 300
}
const dom = {}
let timer

const init = () => {
  dom.buttonStepEl = document.getElementById(conf.buttonStepId)
  dom.buttonTimerEl = document.getElementById(conf.buttonTimerId)

  dom.buttonStepEl.addEventListener('click', buttonStepClick)
  dom.buttonTimerEl.addEventListener('click', () => {
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

export { init }
