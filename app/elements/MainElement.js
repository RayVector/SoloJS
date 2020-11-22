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
      })
    },
  }

  // created() {
  //   console.log('created!')
  // }
  //
  // mounted() {
  //   console.log('mounted!')
  // }

}

export default MainElement