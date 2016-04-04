import { conf } from '../config.js'
import * as Canvas from '../utils/canvas.js'

// --- Config & Local state ----------------------------------------------------

const dom = {
  cursorCanvas: document.getElementById('cursor'),
  cursorChangeButton: document.getElementById('cursor-choose'),
  classChange: ''
}

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  dom.cursorChangeButton.addEventListener('click', () => {

  })

  const context = dom.cursorCanvas.getContext('2d')
  context.fillStyle = '#000'

  const width = 200
  const height = width / 2

  dom.cursorCanvas.width = width
  dom.cursorCanvas.style.width = width + 'px'
  dom.cursorCanvas.height = height
  dom.cursorCanvas.style.height = height + 'px'

  const cursor = conf.cursor.types[5]

  const cursorWidth = cursor.reduce((width, coord) => coord[0] > width ? coord[0] : width, 0) + 1
  const cursorHeight = cursor.reduce((height, coord) => coord[1] > height ? coord[1] : height, 0) + 1

  let cellsX = width / 10
  let cellsY = cellsX / 2

  const multiplier = Math.max(
    (cursorWidth + 2) / cellsX,
    (cursorHeight + 2) / cellsY,
  )

  if (multiplier > 1) {
    cellsX = cellsX * multiplier
    const wholeCell = Math.floor(width / cellsX)
    cellsX = width / wholeCell
    cellsY = cellsX / 2
  }

  const offsetX = cellsX / 2 - cursorWidth / 2
  const offsetY = cellsY / 2 - cursorHeight / 2

  const curriedDrawRect = (x, y) => Canvas.drawRect(context, width, height, cellsX, cellsY, x, y)

  Canvas.clearCanvas(context, width, height)
  cursor.forEach(([x, y]) => {
    curriedDrawRect(x + offsetX, y + offsetY)
  })
}

// --- Export ------------------------------------------------------------------

export default init
