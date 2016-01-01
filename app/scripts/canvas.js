const MAX_CELLS_X = 50
const MAX_CELLS_Y = 50
const COLOR = '#000'

let canvasEl
let canvasSize = {width: 0, height: 0}

const init = (canvasId) => {
  canvasEl = document.getElementById(canvasId)
  canvasSize = {
    width: canvasEl.clientWidth,
    height: canvasEl.clientHeight
  }

  canvasEl.addEventListener('mousedown', mousedown)
  draw(0, 0)
  draw(1, 1)
  draw(2, 0)
}

const draw = (x, y) => {
  drawCell(canvasEl, canvasSize, COLOR, MAX_CELLS_X, MAX_CELLS_Y, x, y)
}

const drawCell = (canvasEl, canvasSize, color, maxCellsX, maxCellsY, x, y) => {
  const context = canvasEl.getContext('2d')

  const drawWidth = canvasSize.width / maxCellsX
  const drawHeight = canvasSize.height / maxCellsY
  const drawX = drawWidth * x
  const drawY = canvasSize.height - drawHeight * y - drawHeight

  context.fillStyle = COLOR
  context.fillRect(drawX, drawY, drawWidth, drawHeight)
}

const clear = () => {
  clearCanvas(canvasEl, canvasSize.width, canvasSize.height)
}

const clearCanvas = (canvasEl, width, height) => {
  const context = canvasEl.getContext('2d')
  context.clearRect(0, 0, width, height)
}

const mousedown = (e) => {
  console.log(e)
}

export { init }
