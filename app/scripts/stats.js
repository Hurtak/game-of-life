
const dom = {
  getGeneration: () => document.getElementById('stats-generation'),
  getLivingCells: () => document.getElementById('stats-cells')
}
let previousState

const init = (store) => {
  const state = store.getState()
  previousState = state.stats

  dom.getGeneration().innerHTML = state.stats.generation
  dom.getLivingCells().innerHTML = state.stats.cells

  store.subscribe(() => { stateHandler(store) })
}

const stateHandler = (store) => {
  const currentState = store.getState()
  if (currentState.stats !== previousState.stats) {
    dom.getGeneration().innerHTML = currentState.stats.generation
    dom.getLivingCells().innerHTML = currentState.stats.cells
  }
  previousState = currentState
}

export default init
