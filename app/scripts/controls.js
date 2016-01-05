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

  let timer
  dom.buttonTimerEl.addEventListener('click', () => {
    timer = timer ? clearTimeout(timer) : setInterval(() => {
      store.dispatch({type: 'TICK'})
    }, conf.timerIntervalMs)
  })
}

// const toggleElementCaption = (element, attributeName) => {
//   const currentCaption = element.innerHTML.trim()
//   element.innerHTML = element.getAttribute(attributeName)
//   element.setAttribute(attributeName, currentCaption)
// }
//
// const toggleTimerButtonCaption = () => {
//   toggleElementCaption(dom.buttonTimerEl, conf.toggleCaptionAttribute)
// }

export { init }
