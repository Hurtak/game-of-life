// --- Config & Local state ----------------------------------------------------

const dom = {
  heading: document.getElementById('heading'),
  statsWrapper: document.getElementById('stats-wrapper'),
  generation: document.getElementById('stats-generation'),
  livingCells: document.getElementById('stats-cells'),
  recalculationTime: document.getElementById('stats-recalculate'),
  redrawTime: document.getElementById('stats-redraw')
}

let previousState = {}

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  stateHandler(store, dom)
  dom.heading.addEventListener('click', () => store.dispatch({ type: 'STATS_VISIBILITY_TOGGLE' }))
  store.subscribe(() => stateHandler(store, dom))
}

const stateHandler = (store, dom) => {
  const currentState = store.getState().stats

  if (currentState.visible !== previousState.visible) {
    dom.statsWrapper.style.display = currentState.visible ? 'block' : 'none'
  }

  if (currentState.visible && currentState !== previousState) {
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
