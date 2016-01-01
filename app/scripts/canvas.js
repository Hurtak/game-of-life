const CELLS_X = 50
const CELLS_Y = 50
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
  console.log(e)
}

export { init }
