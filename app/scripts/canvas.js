import { drawRect, clearCanvas, canvasClick } from './utils/canvas.js'

const conf = {
  canvasId: 'canvas',
  CELLS_X: 20,
  CELLS_Y: 20,
  CELL_COLOR: '#000'
}
const dom = {}
let canvasSize = {}

const init = (store) => {
  dom.canvasEl = document.getElementById(conf.canvasId)
  canvasSize = {
    width: dom.canvasEl.clientWidth,
    height: dom.canvasEl.clientHeight
  }

  dom.canvasContext = dom.canvasEl.getContext('2d')

  dom.canvasEl.addEventListener('click', ({offsetX, offsetY}) => {
    const cellCoordinates = canvasClick(offsetX, offsetY, canvasSize.width, canvasSize.height, conf.CELLS_X, conf.CELLS_Y)
    const [x, y] = cellCoordinates
    store.dispatch({ type: 'TOGGLE_CELL', x, y })
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

const drawCell = (x, y) => {
  dom.canvasContext.fillStyle = conf.CELL_COLOR
  drawRect(dom.canvasContext, canvasSize.width, canvasSize.height, conf.CELLS_X, conf.CELLS_Y, x, y)
}

const clearCell = (x, y) => {
  dom.canvasContext.fillStyle = 'white'
  drawRect(dom.canvasContext, canvasSize.width, canvasSize.height, conf.CELLS_X, conf.CELLS_Y, x, y)
}

const drawAllCells = (cells) => {
  clearAll()
  cells.forEach(([x, y]) => {
    drawCell(x, y)
  })
}

const clearAll = () => {
  clearCanvas(dom.canvasContext, canvasSize.width, canvasSize.height)
}

export { init, drawCell, clearCell, drawAllCells }
