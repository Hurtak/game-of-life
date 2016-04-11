import { conf } from '../config.js' // TODO: only store this data in app state along with index??
import * as Canvas from '../utils/canvas.js'

// --- Config & Local state ----------------------------------------------------

const dom = {
  cursorCanvas: document.getElementById('cursor'),
  cursorChangeButton: document.getElementById('cursor-select'),
  content: document.getElementById('content'),
  cursorsMenu: document.getElementById('cursors-menu'),
  class: {
    cursorsSelectVisible: 'content--cursors-select'
  }
}

let previousState

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  dom.cursorChangeButton.addEventListener('click', () => {
    store.dispatch({ type: 'CURSORS_VISIBILITY_TOGGLE' })
  })

  const width = 200
  const height = width / 2

  const cursor = conf.cursor.types[5]

  renderCursorToCanvas(
    dom.cursorCanvas,
    width,
    height,
    cursor
  )

  renderCursorsMenu(
    conf.cursor.types,
    dom.cursorsMenu
  )

  store.subscribe(() => stateHandler(store))
}

const renderCursorsMenu = (cursors, targetEl) => {
  cursors.forEach(cursor => {
    const canvas = document.createElement('canvas')
    renderCursorToCanvas(canvas, 200, 100, cursor)
    targetEl.appendChild(canvas)
  })
}

const renderCursorToCanvas = (canvas, width, height, cursor) => {
  canvas.width = width
  canvas.style.width = width + 'px'
  canvas.height = height
  canvas.style.height = height + 'px'

  const context = canvas.getContext('2d')
  context.fillStyle = '#000'

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

  Canvas.clearCanvas(context, width, height)

  const curriedDrawRect = (x, y) => Canvas.drawRect(context, width, height, cellsX, cellsY, x, y)
  cursor.forEach(([x, y]) => {
    curriedDrawRect(x + offsetX, y + offsetY)
  })
}

const switchViewToCursosSelect = (yes) => {
  dom.content.classList[yes ? 'add' : 'remove'](dom.class.cursorsSelectVisible)
}

const stateHandler = (store) => {
  const currentState = store.getState().cursorsMenuVisible
  if (currentState !== previousState) {
    switchViewToCursosSelect(currentState)
  }
  previousState = currentState
}

// --- Export ------------------------------------------------------------------

export default init
