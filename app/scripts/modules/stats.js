// --- Config & Local state ----------------------------------------------------

const dom = {
  generation: document.getElementById('stats-generation'),
  livingCells: document.getElementById('stats-cells'),
  recalculationTime: document.getElementById('stats-recalculate'),
  redrawTime: document.getElementById('stats-redraw')
}

let previousState

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  stateHandler(store, dom)
  store.subscribe(() => stateHandler(store, dom))
}

const stateHandler = (store, dom) => {
  const currentState = store.getState().stats
  if (currentState !== previousState) {
    render(dom, currentState)
  }
  previousState = currentState
}

// --- Pure functions ----------------------------------------------------------

const render = (dom, stats) => {
  dom.generation.innerHTML = stats.generation
  dom.livingCells.innerHTML = stats.cells
  dom.recalculationTime.innerHTML = stats.recalculate
  dom.redrawTime.innerHTML = stats.redraw
}

// --- Export ------------------------------------------------------------------

export default init
