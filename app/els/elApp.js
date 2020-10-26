import elSecondApp from './elSecondApp'
import Sjs_el from '../../sjs/render/Sjs_el'

export const data = {
  changedText: 'Magic JS!',
}

export const layout = {
  id: '',
  node: 'span',
  content: data.changedText,
}

export const styles = {
  userSelect: 'none',
  fontSize: '2rem',
  cursor: 'pointer',
}

export const elements = {
  elSecondApp,
}

export const methods = {
  click: e => {
    e.target.innerHTML = 'Hello world!'
  },
  mouseover: e => {
    e.target.style.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  },
}

export default new Sjs_el({
  layout,
  styles,
  elements,
  data,
  methods,
})