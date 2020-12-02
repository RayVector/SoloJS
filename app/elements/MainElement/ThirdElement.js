import Sjs_el from '../../../sjs/element/Sjs_el'
import FourthElement from './ThirdElement/FourthElement'

class ThirdElement extends Sjs_el {
  constructor(props) {
    super(props)
  }

  styles = {
    paddingLeft: '50px',
  }

  template = {
    node: 'div',
    content: () => `${this.props.name} ${this.props.age}`,
    events: [
      {
        type: 'click',
        name: 'doEmit',
        isSelf: true,
      },
    ],
  }

  methods = {
    doEmit: () => {
      this.emit('newEmit')
    },
  }


}

export default ThirdElement