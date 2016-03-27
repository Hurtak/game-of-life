
const conf = {

}

const dom = {
  attribute: {
    buttonLeft: 'data-button-left',
    buttonRight: 'data-button-right',
    items: 'data-items'
  }
}

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
    elements.items.style = `transform: translateX(-${ state.index * 100 }%)`
  })

  elements.buttonRight.addEventListener('click', () => {
    if (state.index === state.maxIndex) return
    state.index++
    elements.items.style = `transform: translateX(-${ state.index * 100 }%)`
  })
}

export default init
