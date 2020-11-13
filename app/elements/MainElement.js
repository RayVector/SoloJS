import Sjs_el from '../../sjs/element/Sjs_el'
import ThirdApp from './MainElement/ThirdElement'

class MainElement extends Sjs_el {
  constructor() {
    super()
  }

  data = {
    text: 'Hello world!',
    newText: 'I am solo js!',
    color: 'green',
    font: '35px',
  }

  styles = {
    color: () => this.color,
    fontSize: () => this.font,
    display: 'flex',
    flexDirection: 'column',
  }

  template = {
    id: 'MainApp',
    node: 'div',
    content: () => this.text,
    events: [
      {
        type: 'click',
        name: 'changeText',
      },
    ],
  }

  childList = [
    ThirdApp,
  ]

  methods = {
    changeText: () => {
      this.changeData({
        text: this.newText,
      })
    },
  }

}

export default new MainElement().create()