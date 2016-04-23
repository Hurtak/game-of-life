import * as canvasUtils from '../utils/canvas.js'

// --- Config & Local state ----------------------------------------------------

const conf = {
  currentCursorCanvas: {
    width: 200,
    height: 100
  },
  cursorMenuCanvas: {
    width: 200,
    height: 100
  }
}

const dom = {
  elements: {
    cursorCanvas: document.getElementById('cursor'),
    content: document.getElementById('content'),
    cursorsMenu: document.getElementById('cursors-menu')
  },
  classes: {
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
  const state = store.getState().cursor
  previousState = state

  renderCursorToCanvas(
    dom.elements.cursorCanvas,
    conf.currentCursorCanvas.width,
    conf.currentCursorCanvas.height,
    state.type
  )

  renderCursorsMenu(
    state.typeValues,
    dom.elements.cursorsMenu,
    store,
    dom.classes
  )

  dom.elements.cursorCanvas.addEventListener('click', () => store.dispatch({ type: 'CURSOR_MENU_TOGGLE' }))
  store.subscribe(() => stateHandler(store))
}

const renderCursorsMenu = (cursors, targetEl, store, classes) => {
  const state = store.getState().cursor

  for (const groupName in cursors) {
    const headingEl = document.createElement('h3')
    headingEl.classList.add(classes.cursorsMenuHeading)
    headingEl.innerHTML = groupName

    targetEl.appendChild(headingEl)

    for (const cursorName in cursors[groupName]) {
      const wrapperEl = document.createElement('div')
      wrapperEl.classList.add(classes.cursorsMenuCursorWrapper)

      wrapperEl.addEventListener('click', () => {
        store.dispatch({ type: 'CURSOR_CHANGE', cursorType: state.typeValues[groupName][cursorName] })
      })

      const canvasEl = document.createElement('canvas')
      canvasEl.classList.add(classes.cursorsMenuCursor)
      const cursorData = cursors[groupName][cursorName]
      renderCursorToCanvas(canvasEl, 200, 100, cursorData)

      const captionEl = document.createElement('p')
      captionEl.classList.add(classes.cursorsMenuCursorCaption)
      captionEl.innerHTML = cursorName

      wrapperEl.appendChild(canvasEl)
      wrapperEl.appendChild(captionEl)
      targetEl.appendChild(wrapperEl)
    }
  }
}

const stateHandler = (store) => {
  const currentState = store.getState().cursor

  if (currentState.menuVisible !== previousState.menuVisible) {
    handleCursorsMenuVisibility(dom.elements.content, dom.classes.cursorsSelectVisible, currentState.menuVisible)
  }

  if (currentState.type !== previousState.type) {
    renderCursorToCanvas(
      dom.elements.cursorCanvas,
      conf.cursorCanvas.width,
      conf.cursorCanvas.height,
      currentState.type
    )
  }

  previousState = currentState
}

// --- Pure functions ----------------------------------------------------------

const renderCursorToCanvas = (canvasEl, width, height, cursor) => {
  canvasEl.width = width
  canvasEl.style.width = width + 'px'
  canvasEl.height = height
  canvasEl.style.height = height + 'px'

  const context = canvasEl.getContext('2d')
  context.fillStyle = '#000'

  const cursorWidth = cursor.reduce((width, [x, _]) => x > width ? x : width, 0) + 1
  const cursorHeight = cursor.reduce((height, [_, y]) => y > height ? y : height, 0) + 1

  let cellsX = width / 10 // TODO
  let cellsY = cellsX / 2 // TODO

  const canvasPaddingInCells = 1

  const multiplier = Math.max(
    (cursorWidth + 2 * canvasPaddingInCells) / cellsX,
    (cursorHeight + 2 * canvasPaddingInCells) / cellsY,
  )

  if (multiplier > 1) {
    cellsX = cellsX * multiplier
    const wholeCell = Math.floor(width / cellsX)
    cellsX = width / wholeCell
    cellsY = cellsX / 2
  }

  canvasUtils.clearCanvas(context, width, height)

  const offsetX = cellsX / 2 - cursorWidth / 2
  const offsetY = cellsY / 2 - cursorHeight / 2
  cursor.forEach(([x, y]) => {
    canvasUtils.drawRect(context, width, height, cellsX, cellsY, x + offsetX, y + offsetY)
  })
}

const handleCursorsMenuVisibility = (menuEl, className, show) => {
  menuEl.classList[show ? 'add' : 'remove'](className)
}

// --- Export ------------------------------------------------------------------

export default init
