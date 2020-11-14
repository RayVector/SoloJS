import Sjs_el from '../../sjs/element/Sjs_el'
import ThirdApp from './MainElement/ThirdElement'

class MainElement extends Sjs_el {
  constructor() {
    super()
  }

  data = {
    text: 'Click me',
    newText: 'Hey, I am SJS!',
    color: 'green',
    childProp: 'Child prop!', // prop
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
      component: ThirdApp,
      props: {
        msg: () => this.childProp,
      },
    },
  ]

  methods = {
    changeText: () => {
      this.changeData({
        text: this.newText,
        childProp: 'Hello world',
      })
    },
  }

  // mounted() {
  //   //console.log('mounted:', this.childColor)
  // }
  //
  // created() {
  //   //console.log('created:', this.childColor)
  // }

}

export default new MainElement().create()