import Sjs_el from '../../../sjs/element/Sjs_el'
import FourthElement from './ThirdElement/FourthElement'

class ThirdElement extends Sjs_el {
  constructor(props) {
    super(props)
  }

  styles = {
    paddingLeft: '50px',
  }

  data = {
    msg: this.styles,
    emitMsg: 'EMIT prop:',
  }

  template = {
    node: 'div',
    content: () => `${this.props.msg} Do emit to parent.`,
    events: [
      {
        type: 'click',
        name: 'doEmit',
        isSelf: true,
      },
    ],
  }

  childList = [
    {
      component: FourthElement,
      props: {
        msg: () => this.msg,
      },
    },
  ]

  methods = {
    doEmit: () => {
      this.emit('newEmit', `${this.emitMsg} ${this.props.msg}`)
    },
  }


}

export default new ThirdElement().create()