export const clearCanvas = (context, width, height) => {
  context.clearRect(0, 0, width, height)
}

export const drawRect = (context, canvasWidth, canvasHeight, cellsX, cellsY, x, y) => {
  const rectWidth = canvasWidth / cellsX
  const rectHeight = canvasHeight / cellsY
  const rectX = Math.round(rectWidth * x)
  const rectY = Math.round(canvasHeight - rectHeight * (y + 1))

  context.fillRect(rectX, rectY, rectWidth, rectHeight)
}

export const canvasClick = (clickX, clickY, canvasWidth, canvasHeight, cellsX, cellsY) => {
  const rectWidth = canvasWidth / cellsX
  const rectHeight = canvasHeight / cellsY

  const cellX = Math.floor(clickX / rectWidth)
  const cellY = cellsY - Math.floor(clickY / rectHeight) - 1

  return [cellX, cellY]
}
