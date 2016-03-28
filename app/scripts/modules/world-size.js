import { conf } from '../config.js'
import slider from '../ui/slider.js'

// --- Config & Local state ----------------------------------------------------

const dom = {
  slider: document.getElementById('world-sizes-slider')
}

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  slider({
    targetEl: dom.slider,
    items: conf.world.dimensions.map(x => x.join(' &times; ')),
    initialIndex: conf.world.initialIndex,
    callback: (index) => {
      store.dispatch({ type: 'CHANGE_WORLD_SIZE', dimensions: conf.world.dimensions[index] })
    }
  })
}

// --- Export ------------------------------------------------------------------

export default init
