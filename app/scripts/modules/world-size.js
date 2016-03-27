// --- Config & Local state ----------------------------------------------------

const conf = {
  toggleButtonClass: 'button--active',
  worldSizeButtonAttribute: 'data-world-size'
}

const dom = {
  getWorldSizeWrapperEl: () => document.getElementById('button-world-size'),
  getButtonWorldSizeEl: (index) => document.querySelector(`[${ conf.worldSizeButtonAttribute }="${ index }"]`),
  getSelectedButtonWorldSizeEl: () => dom.getWorldSizeWrapperEl().querySelector(`.${ conf.toggleButtonClass }`)
}

let previousState

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  previousState = store.getState()
  worldSizeChanged(dom, conf, previousState.size.index)
  dom.getWorldSizeWrapperEl().addEventListener('click', (e) => worldSizeChangeButtonClick(e.target, store, conf.worldSizeButtonAttribute))
  store.subscribe(() => { stateChangeHandler(store) })
}

const stateChangeHandler = (store) => {
  const currentState = store.getState()

  if (currentState.size.index !== previousState.size.index) {
    worldSizeChanged(dom, conf, currentState.size.index)
  }

  previousState = currentState
}

// --- Pure functions ----------------------------------------------------------

const worldSizeChangeButtonClick = (clickedEl, store, attributeName) => {
  if (!clickedEl.hasAttribute(attributeName)) return
  const index = Number(clickedEl.getAttribute(attributeName))

  store.dispatch({type: 'CHANGE_WORLD_SIZE', worldSizeIndex: index})
}

const worldSizeChanged = (dom, conf, index) => {
  const previouslySelectedButton = dom.getSelectedButtonWorldSizeEl()
  if (previouslySelectedButton) {
    previouslySelectedButton.classList.remove(conf.toggleButtonClass)
  }

  const selectedButton = dom.getButtonWorldSizeEl(index)
  selectedButton.classList.add(conf.toggleButtonClass)
}

// --- Export ------------------------------------------------------------------

export default init
