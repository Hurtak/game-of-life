const conf = {
  toggleCaptionAttribute: 'data-toggle-text',
  timerIntervalMs: 100
}
let dom = {}

let previousState
let timer

const init = (store) => {
  dom = {
    buttonStepEl: document.getElementById('button-step'),
    buttonTimerEl: document.getElementById('button-timer')
  }

  dom.buttonStepEl.addEventListener('click', () => {
    store.dispatch({type: 'TICK'})
  })

  dom.buttonTimerEl.addEventListener('click', () => {
    store.dispatch({type: 'TOGGLE_TIMER'})
  })

  previousState = store.getState()
  store.subscribe(() => { stateHandler(store) })
}

const stateHandler = (store) => {
  const currentState = store.getState()
  console.log(previousState.timerRunning);
  if (currentState.timerRunning !== previousState.timerRunning) {
    toggleElementCaption(dom.buttonTimerEl, conf.toggleCaptionAttribute)
    timer = timer ? clearTimeout(timer) : setInterval(() => {
      store.dispatch({type: 'TICK'})
    }, conf.timerIntervalMs)
  }
  previousState = currentState
}

const toggleElementCaption = (element, attributeName) => {
  const currentCaption = element.innerHTML.trim()
  element.innerHTML = element.getAttribute(attributeName)
  element.setAttribute(attributeName, currentCaption)
}

export default init
