import slider from '../ui/slider.js'

// --- Config & Local state ----------------------------------------------------

const conf = {
  // TODO: maybe move this into global config??
  worldSizes: [
    [30, 15], // 40px cell size
    [60, 30], // 20px
    [120, 60], // 10px
    [240, 120], // 5px
    [600, 300], // 2px
    [1200, 600] // 1px
  ],
  initialIndex: 0
}

const dom = {
  slider: document.getElementById('world-sizes-slider')
}

let previousState

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  previousState = store.getState()
  // worldSizeChanged(dom, conf, previousState.size.index)

  slider({
    sliderEl: dom.slider,
    items: conf.worldSizes.map(x => x.join(' &times; ')),
    initialIndex: 1,
    callback: (index) => indexChange(store, index)
  })

  // store.subscribe(() => { stateChangeHandler(store) })
}

// const stateChangeHandler = (store) => {
//   const currentState = store.getState()
//
//   if (currentState.size.index !== previousState.size.index) {
//     worldSizeChanged(dom, conf, currentState.size.index)
//   }
//
//   previousState = currentState
// }

// --- Pure functions ----------------------------------------------------------

const indexChange = (store, index) => {
  store.dispatch({ type: 'CHANGE_WORLD_SIZE', worldSizeIndex: index })
}

// const worldSizeChanged = (dom, conf, index) => {
//   const previouslySelectedButton = dom.getSelectedButtonWorldSizeEl()
//   if (previouslySelectedButton) {
//     previouslySelectedButton.classList.remove(conf.toggleButtonClass)
//   }
//
//   const selectedButton = dom.getButtonWorldSizeEl(index)
//   selectedButton.classList.add(conf.toggleButtonClass)
// }

// --- Export ------------------------------------------------------------------

export default init
