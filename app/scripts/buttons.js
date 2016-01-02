import * as state from './state.js'

const conf = {
  buttonStepId: 'button-step'
}
const dom = {}

const init = () => {
  dom.buttonStepEl = document.getElementById(conf.buttonStepId)

  dom.buttonStepEl.addEventListener('click', () => {
    state.dispatch('TICK')
  })
}

export { init }
