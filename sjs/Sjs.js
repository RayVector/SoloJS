/**
 * The Core
 */
import Sjs_render from './render/Sjs_render'
import SJS_Error from './utils/SJS_Error'

export default class extends Sjs_render {
  init(nodeId, els) {
    if (!els || !els.length) {
      SJS_Error('Sjs init: Element is required for render')
      return
    }

    if (!nodeId) {
      SJS_Error('Sjs init: Node id is required for render')
      return
    }

    this.render(document.getElementById(nodeId), els)
  }
}