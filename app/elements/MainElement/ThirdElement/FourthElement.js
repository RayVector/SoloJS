import Sjs_el from '../../../../sjs/element/Sjs_el'

class FourthElement extends Sjs_el {
  constructor(props) {
    super(props)
  }

  template = {
    node: 'div',
    content: 'Im a child of child!',
  }

  mounted() {
    this.styles = this.props.msg
  }

}

export default new FourthElement().create()