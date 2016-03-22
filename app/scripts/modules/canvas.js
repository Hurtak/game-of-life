import { drawRect, clearCanvas, canvasClick } from '../utils/canvas.js'

// --- Config & Local state ----------------------------------------------------

const conf = {
  WIDTH: 1200,
  HEIGHT: 600,
  CELL_COLOR: '#000'
}

const dom = {
  canvasEl: null,
  canvasContext: null
}

let previousState

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  const state = store.getState()
  previousState = state

  const canvasEl = document.getElementById('canvas')
  canvasEl.width = conf.WIDTH
  canvasEl.height = conf.HEIGHT
  dom.canvasEl = canvasEl
  dom.canvasContext = canvasEl.getContext('2d')

  dom.canvasEl.addEventListener('mousemove', (e) => {
    if (e.which !== 1) return
    const dimensions = store.getState().size.dimensions
    canvasClickEvent(e, store, 'ADD_CELL', dimensions)
  })

  dom.canvasEl.addEventListener('click', (e) => {
    const dimensions = store.getState().size.dimensions
    canvasClickEvent(e, store, 'TOGGLE_CELL', dimensions)
  })

  drawAllCells(state.world, state.size.dimensions)
  store.subscribe(() => stateHandler(store))
}

// --- Local methods -----------------------------------------------------------

const stateHandler = (store) => {
  const state = store.getState()
  const world = state.world
  const boundaries = state.size.dimensions

  if (previousState.size.index === state.size.index && previousState.world === state.world) {
    return
  }

  previousState = state

  // TODO: incremental redraws
  const redrawStart = Date.now()
  drawAllCells(world, boundaries)
  const redrawDuration = Date.now() - redrawStart
  store.dispatch({ type: 'REDRAW', duration: redrawDuration })
}

const drawAllCells = (cells, [maxX, maxY]) => {
  clearCanvas(dom.canvasContext, dom.canvasEl.width, dom.canvasEl.height)
  cells.forEach(([x, y]) => {
    drawCell(x, y, maxX, maxY)
  })
}

const drawCell = (x, y, maxX, maxY) => {
  dom.canvasContext.fillStyle = conf.CELL_COLOR
  drawRect(dom.canvasContext, dom.canvasEl.width, dom.canvasEl.height, maxX, maxY, x, y)
}

// --- Pure functions ----------------------------------------------------------

const canvasClickEvent = ({offsetX, offsetY}, store, dispatchType, [maxX, maxY]) => {
  const [x, y] = canvasClick(offsetX, offsetY, dom.canvasEl.width, dom.canvasEl.height, maxX, maxY)
  store.dispatch({ type: dispatchType, x, y })
}

// const clearCell = (x, y) => {
//   dom.canvasContext.fillStyle = 'white'
//   drawRect(dom.canvasContext, dom.canvasEl.width, dom.canvasEl.height, conf.CELLS_X, conf.CELLS_Y, x, y)
// }

// --- Export ------------------------------------------------------------------

export default init
