import Sjs_el from '../../sjs/element/Sjs_el'

export const data = {
  changedText: 'Hello',
}

export const layout = {
  id: 'elSecondApp',
  node: 'div',
  content: data.changedText,
}

export const styles = {
  userSelect: 'none',
  fontSize: '2rem',
  cursor: 'pointer',
}

export const methods = {
  click: e => {
    console.log('Hey im child!', e)
  },
}

export const element = {
  name: 'elApp',
}

export default new Sjs_el({
  element,
  data,
  layout,
  styles,
  methods,
}).create()