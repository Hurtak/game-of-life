import slider from '../ui/slider.js'

// --- Config & Local state ----------------------------------------------------

const dom = {
  worldSizeSlider: document.getElementById('world-sizes-slider'),
  worldTickButton: document.getElementById('button-step'),
  worldClearButton: document.getElementById('button-clear'),
  worldRandomButton: document.getElementById('button-random')
}

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  const state = store.getState()

  slider({
    targetEl: dom.worldSizeSlider,
    items: state.world.sizeValues.map(x => x.join(' &times; ')),
    leftButton: '<div class="icon icon--world-smaller">Smaller</div>',
    rightButton: '<div class="icon icon--world-bigger">Bigger</div>',
    initialIndex: state.world.sizeValues.indexOf(state.world.size),
    callback: (index) => {
      store.dispatch({ type: 'WORLD_SIZE_CHANGE', sizes: state.world.sizeValues[index] })
    }
  })

  dom.worldTickButton.addEventListener('click', () => store.dispatch({ type: 'WORLD_TICK' }))
  dom.worldClearButton.addEventListener('click', () => store.dispatch({ type: 'WORLD_CLEAR' }))
  dom.worldRandomButton.addEventListener('click', () => store.dispatch({ type: 'WORLD_RANDOM_PATTERN' }))
}

// --- Export ------------------------------------------------------------------

export default init
