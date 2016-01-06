import { drawRect, clearCanvas, canvasClick } from './utils/canvas.js'

const conf = {
  canvasId: 'canvas',
  CELLS_X: 20,
  CELLS_Y: 20,
  CELL_COLOR: '#000'
}
let dom = {}

const init = (store) => {
  const canvasEl = document.getElementById('canvas')
  dom = {
    canvasEl,
    canvasContext: canvasEl.getContext('2d'),
    canvasSize: {
      width: canvasEl.clientWidth,
      height: canvasEl.clientHeight
    }
  }

  dom.canvasEl.addEventListener('click', ({offsetX, offsetY}) => {
    const cellCoordinates = canvasClick(
      offsetX, offsetY, dom.canvasSize.width,
      dom.canvasSize.height, conf.CELLS_X, conf.CELLS_Y
    )
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

const drawAllCells = (cells) => {
  clearCanvas(dom.canvasContext, dom.canvasSize.width, dom.canvasSize.height)
  cells.forEach(([x, y]) => {
    drawCell(x, y)
  })
}

const drawCell = (x, y) => {
  dom.canvasContext.fillStyle = conf.CELL_COLOR
  drawRect(dom.canvasContext, dom.canvasSize.width, dom.canvasSize.height, conf.CELLS_X, conf.CELLS_Y, x, y)
}

const clearCell = (x, y) => {
  dom.canvasContext.fillStyle = 'white'
  drawRect(dom.canvasContext, dom.canvasSize.width, dom.canvasSize.height, conf.CELLS_X, conf.CELLS_Y, x, y)
}

export default init
