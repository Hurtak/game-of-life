import { initialAppState } from './config.js'
import * as world from './utils/world.js'

// --- Main function -----------------------------------------------------------

const reducers = (state = initialAppState, action) => {
  console.log('DISPATCHING', action)

  switch (action.type) {
    case 'WORLD_TICK': return worldTick(state, action)
    case 'WORLD_CLEAR': return worldClear(state, action)
    case 'WORLD_CURSOR_ADD': return worldCursorAlter(state, action, true)
    case 'WORLD_CURSOR_REMOVE': return worldCursorAlter(state, action, false)
    case 'WORLD_SIZE_CHANGE': return worldSizeChange(state, action)

    case 'CURSOR_CHANGE': return cursorChange(state, action)
    case 'CURSOR_MENU_HIDE': return cursorMenuHide(state, action)
    case 'CURSOR_MENU_TOGGLE': return cursorMenuToggle(state, action)

    case 'STATS_REDRAW': return statsRedraw(state, action)

    case 'TIMER_START': return timerStart(state, action)
    case 'TIMER_STOP': return timerStop(state, action)
    case 'TIMER_TOGGLE': return timerToggle(state, action)
    case 'TIMER_INTERVAL_CHANGE': return timerIntervalChange(state, action)

    default: return state
  }
}

// --- Pure functions ----------------------------------------------------------

// World reducers

const worldTick = (state, action) => {
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

const worldClear = (state, action) => {
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

const worldCursorAlter = (state, {x, y}, add) => {
  const newWorld = world[add ? 'addCursor' : 'removeCursor'](state.world, x, y, state.cursor.type)
  const cells = newWorld.length

  return {
    ...state,
    world: newWorld,
    stats: {
      ...state.stats,
      cells
    }
  }
}

const worldSizeChange = (state, action) => {
  return {
    ...state,
    world: world.resize(state.world, state.worldDimensions, action.dimensions),
    worldDimensions: action.dimensions
  }
}

const cursorChange = (state, action) => {
  return {
    ...state,
    cursor: {
      ...state.cursor,
      type: action.cursorType,
      menuVisible: false
    }
  }
}

// Cursor reducers

const cursorMenuHide = (state, action) => {
  return {
    ...state,
    cursor: {
      ...state.cursor,
      menuVisible: false
    }
  }
}

const cursorMenuToggle = (state, action, visible) => {
  return {
    ...state,
    cursor: {
      ...state.cursor,
      menuVisible: !state.cursor.menuVisible
    }
  }
}

// Stats reducers

const statsRedraw = (state, action) => {
  return {
    ...state,
    stats: {
      ...state.stats,
      redraw: action.duration
    }
  }
}

// Timer reducers

const timerStart = (state, action) => ({ ...state, timer: { ...state.timer, enabled: true } })
const timerStop = (state, action) => ({ ...state, timer: { ...state.timer, enabled: false } })
const timerToggle = (state, action) => state.timer.enabled ? timerStop(state, action) : timerStart(state, action)

const timerIntervalChange = (state, action) => {
  return {
    ...state,
    timer: {
      ...state.timer,
      interval: action.interval
    }
  }
}

// --- Export ------------------------------------------------------------------

export default reducers
