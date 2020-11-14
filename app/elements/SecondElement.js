import Sjs_el from '../../sjs/element/Sjs_el'

class SecondElement extends Sjs_el {
  constructor() {
    super()
  }

  styles = {
    fontSize: '25px',
    color: 'darkblue'
  }

  template = {
    node: 'div',
    content: 'I am a neighbor',
  }

}


export default new SecondElement().create()