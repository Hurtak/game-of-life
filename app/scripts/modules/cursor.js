import * as canvasUtils from '../utils/canvas.js'

// --- Config & Local state ----------------------------------------------------

const conf = {
  currentCursorCanvas: {
    width: 250,
    height: 70,
    maxCellSizePx: 8
  },
  cursorMenuCanvas: {
    width: 220,
    height: 100,
    maxCellSizePx: 10
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
    cursorsMenuGroup: 'cursors-menu__group',
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
    conf.currentCursorCanvas.maxCellSizePx,
    state.type
  )

  renderCursorsMenu(
    state.typeValues,
    dom.elements.cursorsMenu,
    conf.cursorMenuCanvas.width,
    conf.cursorMenuCanvas.height,
    conf.cursorMenuCanvas.maxCellSizePx,
    dom.classes,
    store
  )

  dom.elements.cursorCanvas.addEventListener('click', () => store.dispatch({ type: 'CURSOR_MENU_TOGGLE' }))
  store.subscribe(() => stateHandler(store))
}

const stateHandler = (store) => {
  const currentState = store.getState().cursor

  if (currentState.menuVisible !== previousState.menuVisible) {
    handleCursorsMenuVisibility(dom.elements.content, dom.classes.cursorsSelectVisible, currentState.menuVisible)
  }

  if (currentState.type !== previousState.type) {
    renderCursorToCanvas(
      dom.elements.cursorCanvas,
      conf.currentCursorCanvas.width,
      conf.currentCursorCanvas.height,
      conf.currentCursorCanvas.maxCellSizePx,
      currentState.type
    )
  }

  previousState = currentState
}

// --- Pure functions ----------------------------------------------------------

const renderCursorToCanvas = (canvasEl, width, height, maxCellSizePx, cursor) => {
  canvasEl.width = width
  canvasEl.style.width = width + 'px'
  canvasEl.height = height
  canvasEl.style.height = height + 'px'

  const context = canvasEl.getContext('2d')
  context.fillStyle = '#000'

  const cursorWidth = cursor.reduce((width, [x, _]) => x > width ? x : width, 0) + 1
  const cursorHeight = cursor.reduce((height, [_, y]) => y > height ? y : height, 0) + 1

  let minCellsX = width / maxCellSizePx
  let minCellsY = height / maxCellSizePx

  const cursorPadding = 1
  const multiplier = Math.max(
    (cursorWidth + 2 * cursorPadding) / minCellsX,
    (cursorHeight + 2 * cursorPadding) / minCellsY
  )

  let cellsX = minCellsX
  let cellsY = minCellsY
  if (multiplier > 1) {
    // when cursor with given cell size doesn't fit into given canvas width and height, make cells smaller
    cellsX = width / Math.floor(width / (cellsX * multiplier))
    cellsY = height / Math.floor(height / (cellsY * multiplier))
  }

  canvasUtils.clearCanvas(context, width, height)

  const offsetX = cellsX / 2 - cursorWidth / 2
  const offsetY = cellsY / 2 - cursorHeight / 2
  cursor.forEach(([x, y]) => {
    canvasUtils.drawRect(context, width, height, cellsX, cellsY, x + offsetX, y + offsetY)
  })
}

const renderCursorsMenu = (cursors, targetEl, canvasWidth, canvasHeight, maxCellSizePx, classes, store) => {
  const state = store.getState().cursor

  for (const groupName in cursors) {
    const groupEl = document.createElement('div')
    groupEl.classList.add(classes.cursorsMenuGroup)

    const groupNameInDashCase = groupName.toLowerCase().replace(/ +/g, '-')
    const headingIconClass = `${classes.cursorsMenuHeading}--${groupNameInDashCase}`
    const headingEl = document.createElement('h3')
    headingEl.classList.add(classes.cursorsMenuHeading)
    headingEl.classList.add(headingIconClass)
    headingEl.innerHTML = groupName

    groupEl.appendChild(headingEl)
    targetEl.appendChild(groupEl)

    for (const cursorName in cursors[groupName]) {
      const wrapperEl = document.createElement('div')
      wrapperEl.classList.add(classes.cursorsMenuCursorWrapper)
      wrapperEl.style.width = `${canvasWidth}px`

      wrapperEl.addEventListener('click', () => {
        store.dispatch({ type: 'CURSOR_CHANGE', cursorType: state.typeValues[groupName][cursorName] })
      })

      const canvasEl = document.createElement('canvas')
      canvasEl.classList.add(classes.cursorsMenuCursor)

      const cursorData = cursors[groupName][cursorName]
      renderCursorToCanvas(canvasEl, canvasWidth, canvasHeight, maxCellSizePx, cursorData)

      const captionEl = document.createElement('p')
      captionEl.classList.add(classes.cursorsMenuCursorCaption)
      captionEl.innerHTML = cursorName

      wrapperEl.appendChild(canvasEl)
      wrapperEl.appendChild(captionEl)
      groupEl.appendChild(wrapperEl)
    }
  }
}

const handleCursorsMenuVisibility = (menuEl, className, show) => {
  menuEl.classList[show ? 'add' : 'remove'](className)
}

// --- Export ------------------------------------------------------------------

export default init
