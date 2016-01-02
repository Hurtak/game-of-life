import { drawRect, clearCanvas, canvasClick } from './utils/canvas.js'

// Config

const CELLS_X = 20
const CELLS_Y = 20
const COLOR = '#000'

// Main functions

const init = (canvasId) => {
  const canvasEl = document.getElementById(canvasId)
  const canvasSize = {
    width: canvasEl.clientWidth,
    height: canvasEl.clientHeight
  }

  let canvascontext = canvasEl.getContext('2d')
  canvascontext.fillStyle = COLOR

  const drawCell = (x, y) => {
    drawRect(canvascontext, canvasSize.width, canvasSize.height, CELLS_X, CELLS_Y, x, y)
  }

  const clear = () => {
    clearCanvas(canvascontext, canvasSize.width, canvasSize.height)
  }

  drawCell(0, 0)
  drawCell(1, 1)
  drawCell(2, 2)
  drawCell(19, 19)

  canvasEl.addEventListener('click', (e) => {
    const cellCoordinates = canvasClick(e.offsetX, e.offsetY, canvasSize.width, canvasSize.height, CELLS_X, CELLS_Y)
    const [x, y] = cellCoordinates
    drawCell(x, y)
  })
}

// Export

export { init }
