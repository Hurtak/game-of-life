// --- Config & Local state ----------------------------------------------------

const dom = {
  attribute: {
    buttonLeft: 'data-button-left',
    buttonRight: 'data-button-right',
    items: 'data-items'
  }
}

// --- Main methods ------------------------------------------------------------

const init = ({ sliderEl }) => {
  const elements = {
    buttonLeft: sliderEl.querySelector(`[${ dom.attribute.buttonLeft }]`),
    buttonRight: sliderEl.querySelector(`[${ dom.attribute.buttonRight }]`),
    items: sliderEl.querySelector(`[${ dom.attribute.items }]`)
  }

  const state = {
    index: 0,
    maxIndex: elements.items.children.length - 1
  }

  elements.buttonLeft.addEventListener('click', () => {
    if (state.index === 0) return
    state.index--
    changeIndex(elements.items, state.index)
  })

  elements.buttonRight.addEventListener('click', () => {
    if (state.index === state.maxIndex) return
    state.index++
    changeIndex(elements.items, state.index)
  })
}

// --- Pure functions ----------------------------------------------------------

const changeIndex = (element, newIndex) => {
  element.style = `transform: translateX(-${ newIndex * 100 }%)`
}

// --- Export ------------------------------------------------------------------

export default init
