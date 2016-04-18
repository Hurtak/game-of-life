import * as canvasUtils from '../utils/canvas.js'

// --- Config & Local state ----------------------------------------------------

const dom = {
  cursorCanvas: document.getElementById('cursor'),
  cursorChangeButton: document.getElementById('cursor-select'),
  content: document.getElementById('content'),
  cursorsMenu: document.getElementById('cursors-menu'),
  class: {
    cursorsSelectVisible: 'content--cursors-select',
    cursorsMenuHeading: 'cursors-menu__heading',
    cursorsMenuCursorWrapper: 'cursors-menu__cursor-wrapper',
    cursorsMenuCursor: 'cursors-menu__cursor',
    cursorsMenuCursorCaption: 'cursors-menu__cursor-caption'
  }
}

let previousState

// --- Main methods ------------------------------------------------------------

const init = (store) => {
  dom.cursorChangeButton.addEventListener('click', () => {
    store.dispatch({ type: 'CURSOR_MENU_TOGGLE' })
  })

  const state = store.getState().cursor
  previousState = state

  const width = 200
  const height = width / 2

  const cursor = state.type

  renderCursorToCanvas(
    dom.cursorCanvas,
    width,
    height,
    cursor
  )

  renderCursorsMenu(
    state.typeValues,
    dom.cursorsMenu,
    store
  )

  store.subscribe(() => stateHandler(store))
}

const renderCursorsMenu = (cursors, targetEl, store) => {
  const state = store.getState().cursor

  for (const groupName in cursors) {
    const headingEl = document.createElement('h3')
    headingEl.classList.add(dom.class.cursorsMenuHeading)
    headingEl.innerHTML = groupName

    targetEl.appendChild(headingEl)

    for (const cursorName in cursors[groupName]) {
      const wrapperEl = document.createElement('div')
      wrapperEl.classList.add(dom.class.cursorsMenuCursorWrapper)

      wrapperEl.addEventListener('click', () => {
        store.dispatch({ type: 'CURSOR_CHANGE', cursorType: state.typeValues[groupName][cursorName] })
      })

      const canvasEl = document.createElement('canvas')
      canvasEl.classList.add(dom.class.cursorsMenuCursor)
      const cursorData = cursors[groupName][cursorName]
      renderCursorToCanvas(canvasEl, 200, 100, cursorData)

      const captionEl = document.createElement('p')
      captionEl.classList.add(dom.class.cursorsMenuCursorCaption)
      captionEl.innerHTML = cursorName

      wrapperEl.appendChild(canvasEl)
      wrapperEl.appendChild(captionEl)
      targetEl.appendChild(wrapperEl)
    }
  }
}

const renderCursorToCanvas = (canvasEl, width, height, cursor) => {
  canvasEl.width = width
  canvasEl.style.width = width + 'px'
  canvasEl.height = height
  canvasEl.style.height = height + 'px'

  const context = canvasEl.getContext('2d')
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

  canvasUtils.clearCanvas(context, width, height)

  const curriedDrawRect = (x, y) => canvasUtils.drawRect(context, width, height, cellsX, cellsY, x, y)
  cursor.forEach(([x, y]) => {
    curriedDrawRect(x + offsetX, y + offsetY)
  })
}

const switchViewToCursosSelect = (yes) => {
  dom.content.classList[yes ? 'add' : 'remove'](dom.class.cursorsSelectVisible)
}

const stateHandler = (store) => {
  const currentState = store.getState().cursor

  if (currentState.menuVisible !== previousState.menuVisible) {
    switchViewToCursosSelect(currentState.menuVisible)
  }

  if (currentState.type !== previousState.type) {
    renderCursorToCanvas(
      dom.cursorCanvas,
      200,
      100,
      currentState.type
    )
  }

  previousState = currentState
}

// --- Export ------------------------------------------------------------------

export default init
