import Sjs_el from '../../sjs/element/Sjs_el'
// new Proxy(target, {proxy})
const elApp = new Sjs_el()

elApp.$name = 'elApp'

elApp.data = {
  changedText: 'Hello world!',
  color: '#000000',
}

elApp.layout = {
  id: 'elApp',
  node: 'div',
  content: elApp.rel(['data', 'changedText']),
}

elApp.methods = {
  changeText: {
    func: e => {
      elApp.data = {
        changedText: 'Magic JS!',
      }
    },
    type: 'click',
  },
  // changeColor: {
  //   func: e => {
  //     data.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  //   },
  //   type: 'mouseover',
  // },
}

// elApp.styles = {
//   userSelect: 'none',
//   fontSize: '2rem',
//   cursor: 'pointer',
// }

export default elApp.create()