import Sjs_el from '../../../../sjs/element/Sjs_el'

class FourthElement extends Sjs_el {
  constructor(props) {
    super(props)
  }

  styles = {
    paddingLeft: '50px',
  }

  template = {
    node: 'div',
    content: () => `id: ${this.props.id}`,
  }
}

export default FourthElement