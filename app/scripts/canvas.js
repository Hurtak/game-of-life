import { drawRect, clearCanvas, canvasClick } from './utils/canvas.js'

const conf = {
  WIDTH: 1200,
  HEIGHT: 600,
  CELLS_X: 60,
  CELLS_Y: 30,
  CELL_COLOR: '#000'
}
let dom = {}

const init = (store) => {
  const canvasEl = document.getElementById('canvas')
  canvasEl.width = conf.WIDTH
  canvasEl.height = conf.HEIGHT
  dom = {
    canvasEl,
    canvasContext: canvasEl.getContext('2d')
  }

  dom.canvasEl.addEventListener('mousemove', (e) => {
    if (e.which !== 1) return
    canvasClickEvent(e, store, 'ADD_CELL')
  })

  dom.canvasEl.addEventListener('click', (e) => {
    canvasClickEvent(e, store, 'TOGGLE_CELL')
  })

  drawAllCells(store.getState().world)
  store.subscribe(() => { stateHandler(store) })
}

let previousState
const stateHandler = (store) => {
  const state = store.getState().world
  if (state === previousState) return
  previousState = state

  // TODO: incremental redraws
  drawAllCells(state)
}

const canvasClickEvent = ({offsetX, offsetY}, store, dispatchType) => {
  const cellCoordinates = canvasClick(offsetX, offsetY, dom.canvasEl.width, dom.canvasEl.height, conf.CELLS_X, conf.CELLS_Y)
  const [x, y] = cellCoordinates
  store.dispatch({ type: dispatchType, x, y })
}

const drawAllCells = (cells) => {
  clearCanvas(dom.canvasContext, dom.canvasEl.width, dom.canvasEl.height)
  cells.forEach(([x, y]) => {
    drawCell(x, y)
  })
}

const drawCell = (x, y) => {
  dom.canvasContext.fillStyle = conf.CELL_COLOR
  drawRect(dom.canvasContext, dom.canvasEl.width, dom.canvasEl.height, conf.CELLS_X, conf.CELLS_Y, x, y)
}

const clearCell = (x, y) => {
  dom.canvasContext.fillStyle = 'white'
  drawRect(dom.canvasContext, dom.canvasEl.width, dom.canvasEl.height, conf.CELLS_X, conf.CELLS_Y, x, y)
}

export default init
