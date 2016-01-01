const CELLS_X = 20
const CELLS_Y = 20
const COLOR = '#000'

let canvasSize = {width: 0, height: 0}
let canvascontext

const init = (canvasId) => {
  const canvasEl = document.getElementById(canvasId)
  canvasSize = {
    width: canvasEl.clientWidth,
    height: canvasEl.clientHeight
  }

  canvascontext = canvasEl.getContext('2d')
  canvascontext.fillStyle = COLOR

  drawCell(0, 0)
  drawCell(1, 1)
  drawCell(2, 2)
  drawCell(19, 19)

  canvasEl.addEventListener('mousedown', mousedown)
}

const drawCell = (x, y) => {
  drawRect(canvascontext, canvasSize.width, canvasSize.height, CELLS_X, CELLS_Y, x, y)
}

const drawRect = (context, canvasWidth, canvasHeight, cellsX, cellsY, x, y) => {
  const rectWidth = canvasWidth / cellsX
  const rectHeight = canvasHeight / cellsY
  const rectX = rectWidth * x
  const rectY = canvasHeight - rectHeight * y - rectHeight

  context.fillRect(rectX, rectY, rectWidth, rectHeight)
}

const clear = () => {
  clearCanvas(canvascontext, canvasSize.width, canvasSize.height)
}

const clearCanvas = (context, width, height) => {
  context.clearRect(0, 0, width, height)
}

const mousedown = (e) => {
  const rectWidth = canvasSize.width / CELLS_X
  const rectHeight = canvasSize.height / CELLS_Y

  const cellX = Math.floor(e.offsetX / rectWidth)
  const cellY = CELLS_Y - Math.floor(e.offsetY / rectHeight) - 1

  console.log('cell ', [cellX, cellY])
}

export { init }
