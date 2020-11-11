import Sjs_el from '../../sjs/element/Sjs_el'

class MainApp extends Sjs_el {
  constructor() {
    super()
  }

  name = 'MainApp'

  data = {
    text: 'Hello world!',
    color: 'green',
    font: '2rem',
  }

  styles = {
    color: () => this.color,
    fontSize: () => this.font,
  }

  template = {
    id: 'MainApp',
    node: 'div',
    content: () => this.text,
    methods: [
      {
        type: 'click',
        name: 'changeText',
      },
    ],
  }

  methods = {
    changeText: () => {
      this.changeData({
        text: 'Magic JS!',
        color: 'blue',
        font: '5rem',
      })
    },
  }

}

export default new MainApp().create()