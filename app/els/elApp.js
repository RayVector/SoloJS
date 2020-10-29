import Sjs_el from '../../sjs/element/Sjs_el'

const name = 'elApp'

const data = {
  changedText: 'Hello world!',
  color: '#000000',
}

const layout = {
  id: 'elApp',
  node: 'div',
  content: () => ['data', 'changedText'],
  methods: [
    {
      name: 'changeText',
      type: 'click',
    },
  ],
}

const methods = {
  changeText: () => {
    return {
      changedText: 'Magic JS!',
    }
  },
}

const el = {
  name,
  data,
  layout,
  methods,
}


export default new Sjs_el(el).create()