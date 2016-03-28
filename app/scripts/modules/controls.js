// --- Config & Local state ----------------------------------------------------

const conf = {
  toggleCaptionAttribute: 'data-toggle-text',
  toggleButtonClass: 'button--active',
  intervalButtonSelectedClass: 'button-interval--active'
}

const dom = {
  getButtonStepEl: () => document.getElementById('button-step'),
  getButtonClearEl: () => document.getElementById('button-clear'),
  getButtonTimerToggleEl: () => document.getElementById('button-timer-toggle')
}

let previousState
let timer

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  previousState = store.getState()

  dom.getButtonStepEl().addEventListener('click', () => store.dispatch({type: 'TICK'}))
  dom.getButtonClearEl().addEventListener('click', () => store.dispatch({type: 'CLEAR_WORLD'}))
}

// --- Export ------------------------------------------------------------------

export default init
