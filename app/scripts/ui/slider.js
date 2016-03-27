// --- Config & Local state ----------------------------------------------------

const dom = {
  attribute: {
    buttonLeft: 'data-button-left',
    buttonRight: 'data-button-right',
    items: 'data-items'
  }
}

// --- Main methods ------------------------------------------------------------

const init = ({ sliderEl, items = [], initialIndex, callback }) => {
  // instance state
  const elements = {
    buttonLeft: sliderEl.querySelector(`[${ dom.attribute.buttonLeft }]`),
    buttonRight: sliderEl.querySelector(`[${ dom.attribute.buttonRight }]`),
    itemsWrapper: sliderEl.querySelector(`[${ dom.attribute.items }]`)
  }

  const state = {
    index: initialIndex,
    maxIndex: items.length - 1
  }

  // rendering
  elements.itemsWrapper.innerHTML = itemsTemplate(items)
  renderIndexChange(elements.itemsWrapper, state.index)

  // event listeners
  const curriedIndexChange = (newIndex) =>
    indexChange(state.index, newIndex, state.maxIndex, elements.itemsWrapper, callback)

  elements.buttonLeft.addEventListener('click', () => {
    state.index = curriedIndexChange(state.index - 1)
  })

  elements.buttonRight.addEventListener('click', () => {
    state.index = curriedIndexChange(state.index + 1)
  })
}

// --- Pure functions ----------------------------------------------------------

const indexChange = (oldIndex, newIndex, maxIndex, itemsWrapperEl, callback) => {
  if (newIndex <= 0) return 0
  if (newIndex >= maxIndex) return maxIndex

  renderIndexChange(itemsWrapperEl, newIndex)
  callback(newIndex)

  return newIndex
}

const renderIndexChange = (element, newIndex) => {
  element.style = `transform: translateX(-${ newIndex * 100 }%)`
}

const itemsTemplate = (items) => {
  return items
    .map(item => `<li class="slider__item">${ item }</li>`)
    .join('')
}

// --- Export ------------------------------------------------------------------

export default init
