import slider from '../ui/slider.js'

// --- Config & Local state ----------------------------------------------------

const dom = {
  worldSizeSlider: document.getElementById('world-sizes-slider'),
  worldTickButton: document.getElementById('button-step'),
  worldClearButton: document.getElementById('button-clear')
}

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  const state = store.getState()

  slider({
    targetEl: dom.worldSizeSlider,
    items: state.worldDimensionValues.map(x => x.join(' &times; ')),
    initialIndex: state.worldDimensionValues.indexOf(state.worldDimension),
    callback: (index) => {
      store.dispatch({ type: 'WORLD_SIZE_CHANGE', dimensions: state.worldDimensionValues[index] })
    }
  })

  dom.worldTickButton.addEventListener('click', () => store.dispatch({ type: 'WORLD_TICK' }))
  dom.worldClearButton.addEventListener('click', () => store.dispatch({ type: 'WORLD_CLEAR' }))
}

// --- Export ------------------------------------------------------------------

export default init
