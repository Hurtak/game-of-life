import { initialAppState } from './config.js'
import * as world from './utils/world.js'

// --- Main function -----------------------------------------------------------

const reducers = (state = initialAppState, action) => {
  console.log('DISPATCHING', action)
  // TODO: unify action names
  switch (action.type) {
    case 'ADD_CELL': return alterCell(state, action, true)
    case 'REMOVE_CELL': return alterCell(state, action, false)
    case 'TOGGLE_CELL': return toggleCell(state, action)

    case 'TICK': return tick(state, action)
    case 'CLEAR_WORLD': return clearWorld(state, action)
    case 'CHANGE_WORLD_SIZE': return changeWorldSize(state, action)
    case 'REDRAW': return redraw(state, action)

    case 'START_TIMER': return startTimer(state, action)
    case 'STOP_TIMER': return stopTimer(state, action)
    case 'TOGGLE_TIMER': return toggleTimer(state, action)
    case 'CHANGE_TIMER_INTERVAL': return changeTimerInterval(state, action)

    case 'CURSORS_VISIBILITY_TOGGLE': return cursorsVisibilityToggle(state, action)
    case 'CURSORS_VISIBILITY_HIDE': return cursorsVisibilityHide(state, action)
    case 'CURSORS_CHANGE': return cursorsChange(state, action)

    default: return state
  }
}

// --- Pure functions ----------------------------------------------------------

const alterCell = (state, {x, y}, addCell) => {
  const newWorld = world[addCell ? 'addCell' : 'removeCell'](state.world, x, y)
  const cells = newWorld.length

  return {
    ...state,
    world: newWorld,
    stats: {
      ...state.stats,
      cells,
    }
  }
}

const toggleCell = (state, action) => {
  let cellExists = world.getCell(state.world, action.x, action.y)

  return alterCell(state, action, !cellExists)
}

const tick = (state, action) => {
  const recalculationStart = Date.now()
  let newWorld = world.tick(state.world || [])
  const [maxX, maxY] = state.worldDimensions

  const clampIndent = 1
  newWorld = world.clamp(newWorld, 0 - clampIndent, maxX + clampIndent, 0 - clampIndent, maxY + clampIndent)

  const recalculationDuration = Date.now() - recalculationStart

  const generation = state.stats.generation + 1
  const cells = newWorld.length

  return {
    ...state,
    world: newWorld,
    stats: {
      ...state.stats,
      generation,
      cells,
      recalculate: recalculationDuration
    }
  }
}

const clearWorld = (state, action) => {
  return {
    ...state,
    world: [],
    timer: {
      ...state.timer,
      enabled: false
    },
    stats: {
      ...state.stats,
      cells: 0,
      generation: 0,
      recalculate: 0
    }
  }
}

const redraw = (state, action) => {
  return {
    ...state,
    stats: {
      ...state.stats,
      redraw: action.duration
    }
  }
}

const changeWorldSize = (state, action) => {
  return {
    ...state,
    world: world.resize(state.world, state.worldDimensions, action.dimensions),
    worldDimensions: action.dimensions
  }
}

const changeTimerInterval = (state, action) => {
  return {
    ...state,
    timer: {
      ...state.timer,
      interval: action.interval
    }
  }
}

const toggleTimer = (state, action) => state.timer.enabled ? stopTimer(state, action) : startTimer(state, action)
const startTimer = (state, action) => ({ ...state, timer: { ...state.timer, enabled: true } })
const stopTimer = (state, action) => ({ ...state, timer: { ...state.timer, enabled: false } })

const cursorsVisibilityToggle = (state, action, visible) => {
  return {
    ...state,
    cursor: {
      ...state.cursor,
      menuVisible: !state.cursor.menuVisible
    }
  }
}

const cursorsVisibilityHide = (state, action) => {
  return {
    ...state,
    cursor: {
      ...state.cursor,
      menuVisible: false
    }
  }
}

const cursorsChange = (state, action) => {
  return {
    ...state,
    cursor: {
      ...state.cursor,
      type: action.cursorType,
      menuVisible: false
    }
  }
}

// --- Export ------------------------------------------------------------------

export default reducers
