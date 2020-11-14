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
  }

  template = {
    node: 'div',
    content: () => `Im a child! ${this.props.msg}`,
  }

  childList = [
    {
      component: FourthElement,
      props: {
        msg: () => this.msg,
      },
    },
  ]


}

export default new ThirdElement().create()