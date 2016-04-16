import { conf } from '../config.js'
import slider from '../ui/slider.js'

// --- Config & Local state ----------------------------------------------------

const dom = {
  worldSizeSlider: document.getElementById('world-sizes-slider'),
  worldTickButton: document.getElementById('button-step'),
  worldClearButton: document.getElementById('button-clear')
}

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  slider({
    targetEl: dom.worldSizeSlider,
    items: conf.world.dimensions.map(x => x.join(' &times; ')),
    initialIndex: conf.world.initialIndex,
    callback: (index) => {
      store.dispatch({ type: 'WORLD_SIZE_CHANGE', dimensions: conf.world.dimensions[index] })
    }
  })

  dom.worldTickButton.addEventListener('click', () => store.dispatch({type: 'WORLD_TICK'}))
  dom.worldClearButton.addEventListener('click', () => store.dispatch({type: 'WORLD_CLEAR'}))
}

// --- Export ------------------------------------------------------------------

export default init
