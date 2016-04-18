import * as canvasUtils from '../utils/canvas.js'
import * as worldUtils from '../utils/world.js'

// --- Config & Local state ----------------------------------------------------

const dom = {
  canvasEl: document.getElementById('canvas'),
  canvasContext: document.getElementById('canvas').getContext('2d')
}

let previousState

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  const state = store.getState()
  previousState = state

  dom.canvasEl.width = state.canvas.width
  dom.canvasEl.height = state.canvas.height

  dom.canvasEl.addEventListener('mousedown', (e) => {
    if (e.which !== 1) return

    const { worldDimension, world } = store.getState()
    // TODO: refactor
    const [x, y] = canvasUtils.canvasClick(e.offsetX, e.offsetY, dom.canvasEl.width, dom.canvasEl.height, worldDimension[0], worldDimension[1])
    const cellExists = worldUtils.getCell(world, x, y)

    const mouseMove = (e) => {
      const [x, y] = canvasUtils.canvasClick(e.offsetX, e.offsetY, dom.canvasEl.width, dom.canvasEl.height, worldDimension[0], worldDimension[1])
      store.dispatch({ type: cellExists ? 'WORLD_CURSOR_REMOVE' : 'WORLD_CURSOR_ADD', x, y })
    }

    dom.canvasEl.addEventListener('mousemove', mouseMove)
    dom.canvasEl.addEventListener('mouseup', function mouseUp (e) {
      mouseMove(e)
      dom.canvasEl.removeEventListener('mouseup', mouseUp)
      dom.canvasEl.removeEventListener('mousemove', mouseMove)
    })
  })

  drawAllCells(state.world, state.worldDimension, state.canvas.cellColor)
  store.subscribe(() => stateHandler(store))
}

// --- Local methods -----------------------------------------------------------

const stateHandler = (store) => {
  const state = store.getState()
  const world = state.world
  const boundaries = state.worldDimension

  const worldIsTheSame =
    previousState.worldDimension === state.worldDimension &&
    previousState.world === state.world

  if (worldIsTheSame) return

  previousState = state

  const redrawStart = Date.now()
  drawAllCells(world, boundaries, state.canvas.cellColor)
  const redrawDuration = Date.now() - redrawStart
  store.dispatch({ type: 'STATS_REDRAW', duration: redrawDuration })
}

const drawAllCells = (cells, [maxX, maxY], cellColor) => {
  canvasUtils.clearCanvas(dom.canvasContext, dom.canvasEl.width, dom.canvasEl.height)
  cells.forEach(([x, y]) => {
    drawCell(x, y, maxX, maxY, cellColor)
  })
}

const drawCell = (x, y, maxX, maxY, cellColor) => {
  dom.canvasContext.fillStyle = cellColor
  canvasUtils.drawRect(dom.canvasContext, dom.canvasEl.width, dom.canvasEl.height, maxX, maxY, x, y)
}

// --- Pure functions ----------------------------------------------------------

// --- Export ------------------------------------------------------------------

export default init
