import Sjs_el from '../../sjs/element/Sjs_el'

class App extends Sjs_el {
  constructor() {
    super()
  }

  name = 'elApp'

  data = {
    changedText: 'Hello world!',
    color: '#000000',
  }

  layout = {
    id: 'elApp',
    node: 'div',
    content: this.bind(() => 'changedText'),
    methods: [
      {
        name: 'changeText',
        type: 'click',
      },
    ],
  }

  methods = {
    changeText: () => {
      this.changeData({ changedText: 'Magic JS!' })
    },
  }

}

console.log('App:', new App())

export default new App().create()