import Sjs_el from '../../../../sjs/element/Sjs_el'

class FourthElement extends Sjs_el {
  constructor(props) {
    super(props)
  }

  template = {
    node: 'div',
    content: 'Im a child of child!',
  }
}

export default FourthElement