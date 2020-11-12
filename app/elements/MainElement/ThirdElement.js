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
    content: 'Im a child!',
  }

  childList = [
    FourthElement,
  ]

}

export default new ThirdElement().create()