import { conf } from '../config.js'
import * as Canvas from '../utils/canvas.js'
import * as World from '../utils/world.js'

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

  dom.canvasEl.width = conf.canvas.width
  dom.canvasEl.height = conf.canvas.height

  dom.canvasEl.addEventListener('mousedown', (e) => {
    if (e.which !== 1) return

    const { worldDimensions, world } = store.getState()
    // TODO: refactor
    const [x, y] = Canvas.canvasClick(e.offsetX, e.offsetY, dom.canvasEl.width, dom.canvasEl.height, worldDimensions[0], worldDimensions[1])
    const cellExists = World.getCell(world, x, y)

    const mouseMove = (e) => {
      const [x, y] = Canvas.canvasClick(e.offsetX, e.offsetY, dom.canvasEl.width, dom.canvasEl.height, worldDimensions[0], worldDimensions[1])
      store.dispatch({ type: cellExists ? 'WORLD_CURSOR_REMOVE' : 'WORLD_CURSOR_ADD', x, y })
    }

    dom.canvasEl.addEventListener('mousemove', mouseMove)
    dom.canvasEl.addEventListener('mouseup', function mouseUp (e) {
      mouseMove(e)
      dom.canvasEl.removeEventListener('mouseup', mouseUp)
      dom.canvasEl.removeEventListener('mousemove', mouseMove)
    })
  })

  drawAllCells(state.world, state.worldDimensions)
  store.subscribe(() => stateHandler(store))
}

// --- Local methods -----------------------------------------------------------

const stateHandler = (store) => {
  const state = store.getState()
  const world = state.world
  const boundaries = state.worldDimensions

  const worldIsTheSame =
    previousState.worldDimensions === state.worldDimensions &&
    previousState.world === state.world

  if (worldIsTheSame) return

  previousState = state

  const redrawStart = Date.now()
  drawAllCells(world, boundaries)
  const redrawDuration = Date.now() - redrawStart
  store.dispatch({ type: 'STATS_REDRAW', duration: redrawDuration })
}

const drawAllCells = (cells, [maxX, maxY]) => {
  Canvas.clearCanvas(dom.canvasContext, dom.canvasEl.width, dom.canvasEl.height)
  cells.forEach(([x, y]) => {
    drawCell(x, y, maxX, maxY)
  })
}

const drawCell = (x, y, maxX, maxY) => {
  dom.canvasContext.fillStyle = conf.canvas.cellColor
  Canvas.drawRect(dom.canvasContext, dom.canvasEl.width, dom.canvasEl.height, maxX, maxY, x, y)
}

// --- Pure functions ----------------------------------------------------------

// --- Export ------------------------------------------------------------------

export default init
