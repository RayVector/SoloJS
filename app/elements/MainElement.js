import Sjs_el from '../../sjs/element/Sjs_el'
import ThirdElement from './MainElement/ThirdElement'

class MainElement extends Sjs_el {
  constructor() {
    super()
  }

  data = {
    text: 'Change text and pass prop',
    newText: 'Hey, I am SJS!',
    color: 'green',
    childProp: 'It is prop text!', // prop
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
        isSelf: true,
      },
    ],
  }

  childList = [
    {
      component: new ThirdElement().create(),
      props: {
        msg: () => this.childProp,
      },
      emitEvents: {
        newEmit: e => {
          this.changeData({
            text: e,
          })
        },
      },
    },
  ]

  methods = {
    changeText: () => {
      this.changeData({
        text: this.newText,
        childProp: 'Hello world.',
        color: '#000000',
      })
    },
  }

  created(el) {
    console.log('created!', el)
  }

  mounted(el) {
    console.log('mounted!', el)
  }

  rerendered(el) {
    console.log('rerendered!', el)
  }

  gotProps(e) {
    console.log('gotProps:', e)
  }

}

export default MainElement