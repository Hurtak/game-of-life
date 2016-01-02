// Local variables

let subscribers = {}
let state = {}
let handlers

// Local methods

const init = (stateHandler, initialState = {}) => {
  handlers = stateHandler
  state = initialState
}

const subscribe = (actionType, cb) => {
  if (!(actionType in subscribers)) {
    subscribers[actionType] = []
  }
  subscribers[actionType].push(cb)
  return () => {
    subscribers = unsubscribe(subscribers, actionType, cb)
  }
}

const dispatch = (actionType, data) => {
  const timestamp = Date.now()
  state = handlers[actionType](state, data)

  if (!(actionType in subscribers)) return
  subscribers[actionType].forEach(cb => {
    cb({ type: actionType, timestamp, state, data })
  })
}

const getState = () => state

// Local methods

const unsubscribe = (subscribers, actionType, cb) => {
  if (!(actionType in subscribers)) return
  return subscribers[actionType].filter(sub => sub !== cb)
}

// Export

export {init, subscribe, dispatch, getState}
