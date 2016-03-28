import slider from '../ui/slider.js'

// --- Config & Local state ----------------------------------------------------

const conf = {
  worldSizes: [
    [30, 15], // 40px cell size
    [60, 30], // 20px
    [120, 60], // 10px
    [240, 120], // 5px
    [600, 300], // 2px
    [1200, 600] // 1px
  ],
  initialWorldSizeIndex: 1
}

const dom = {
  slider: document.getElementById('world-sizes-slider')
}

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  slider({
    targetEl: dom.slider,
    items: conf.worldSizes.map(x => x.join(' &times; ')),
    initialIndex: conf.initialWorldSizeIndex,
    callback: (index) => {
      store.dispatch({ type: 'CHANGE_WORLD_SIZE', newDimensions: conf.worldSizes[index] })
    }
  })
}

// --- Export ------------------------------------------------------------------

export default init
