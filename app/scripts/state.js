// Local variables

let state = {}
let handlers

// Local methods

const init = (stateHandler, initialState = {}) => {
  handlers = stateHandler
  state = initialState
}

const dispatch = (actionType, data) => {
  if (!(actionType in handlers)) {
    throw new Error(`Unknown action type '${actionType}' dispatched`)
  }

  let stateCopy = Object.assign({}, state)
  state = handlers[actionType](stateCopy, data)
}

const getState = () => state

// Export

export {init, dispatch, getState}
