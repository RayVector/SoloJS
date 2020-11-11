import Sjs_el from '../../../sjs/element/Sjs_el'

class ThirdApp extends Sjs_el {
  constructor(props) {
    super(props)

  }

  template = {
    node: 'span',
    content: 'Im a child!',
  }

}

export default new ThirdApp().create()