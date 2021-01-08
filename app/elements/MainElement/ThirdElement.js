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
    list: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
  }

  template = {
    node: 'div',
    content: () => `${this.props.id} ${this.props.name} ${this.props.age}`,
    events: [
      {
        type: 'click',
        name: 'doEmit',
        isSelf: true,
      },
    ],
  }

  childList = [
    () => this.data.list.map(el => {
      return {
        component: FourthElement,
        props: {
          id: () => el.id,
        },
      }
    }),
  ]

  events = {
    doEmit: () => {
      this.emit('newEmit')
    },
  }


}

export default ThirdElement