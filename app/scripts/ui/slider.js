// --- Config & Local state ----------------------------------------------------

const dom = {
  attribute: {
    buttonLeft: 'data-button-left',
    buttonRight: 'data-button-right',
    itemsWrapper: 'data-items'
  }
}

// --- Main methods ------------------------------------------------------------

const init = ({ targetEl, leftButton, rightButton, items = [], initialIndex = 0, callback }) => {
  // instance state
  const state = {
    index: initialIndex,
    maxIndex: items.length - 1
  }

  // rendering
  targetEl.innerHTML = template(leftButton, rightButton, items, dom.attribute)
  const elements = {
    buttonLeft: targetEl.querySelector(`[${dom.attribute.buttonLeft}]`),
    buttonRight: targetEl.querySelector(`[${dom.attribute.buttonRight}]`),
    itemsWrapper: targetEl.querySelector(`[${dom.attribute.itemsWrapper}]`)
  }
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
  if (newIndex < 0) return oldIndex
  if (newIndex > maxIndex) return oldIndex

  renderIndexChange(itemsWrapperEl, newIndex)
  callback(newIndex)

  return newIndex
}

const renderIndexChange = (element, newIndex) => {
  element.style.transform = `translateX(-${newIndex * 100}%)`
}

const template = (leftButton = '', rightButton = '', items, attribute) => `
  <div class="slider">
    <div class="slider__button" ${attribute.buttonLeft}>
      ${leftButton}
    </div>
    <div class="slider__items-view">
      <ul class="slider__items-wrapper" ${attribute.itemsWrapper}>
        ${
          items.map(item => `<li class="slider__item">${item}</li>`).join('')
        }
      </ul>
    </div>
    <div class="slider__button" ${attribute.buttonRight}>
      ${rightButton}
    </div>
  </div>
`

// --- Export ------------------------------------------------------------------

export default init
