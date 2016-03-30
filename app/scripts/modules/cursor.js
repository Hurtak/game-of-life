import { conf } from '../config.js'
import slider from '../ui/slider.js'

// --- Config & Local state ----------------------------------------------------

const dom = {
  // worldSizeSlider: document.getElementById('world-sizes-slider'),
  // worldTickButton: document.getElementById('button-step'),
  // worldClearButton: document.getElementById('button-clear')
}

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  // slider({
  //   targetEl: dom.worldSizeSlider,
  //   items: conf.world.dimensions.map(x => x.join(' &times; ')),
  //   initialIndex: conf.world.initialIndex,
  //   callback: (index) => {
  //     store.dispatch({ type: 'CHANGE_WORLD_SIZE', dimensions: conf.world.dimensions[index] })
  //   }
  // })

}

// --- Export ------------------------------------------------------------------

export default init
