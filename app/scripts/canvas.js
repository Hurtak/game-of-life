import { drawRect, clearCanvas, canvasClick } from './utils/canvas.utils.js'
import * as state from './state.js'

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

  const drawCell = (x, y) => {
    canvascontext.fillStyle = COLOR
    drawRect(canvascontext, canvasSize.width, canvasSize.height, CELLS_X, CELLS_Y, x, y)
  }

  const clearCell = (x, y) => {
    canvascontext.fillStyle = 'white'
    drawRect(canvascontext, canvasSize.width, canvasSize.height, CELLS_X, CELLS_Y, x, y)
  }

  const clear = () => {
    clearCanvas(canvascontext, canvasSize.width, canvasSize.height)
  }

  canvasEl.addEventListener('click', (e) => {
    const cellCoordinates = canvasClick(e.offsetX, e.offsetY, canvasSize.width, canvasSize.height, CELLS_X, CELLS_Y)
    const [x, y] = cellCoordinates
    state.dispatch('TOGGLE_CELL', { x, y })
  })

  state.subscribe('TOGGLE_CELL', ({data}) => {
    if (data.drawCell) {
      drawCell(data.x, data.y)
    } else {
      clearCell(data.x, data.y)
    }
  })

  state.subscribe('TICK', ({data}) => {
    clear()
    data.world.forEach(([x, y]) => {
      drawCell(x, y)
    })
  })
}

// Export

export { init }
