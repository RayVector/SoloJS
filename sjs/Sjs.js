/**
 * The Core
 */
import Sjs_render from './render/Sjs_render'

export default class extends Sjs_render {
  init(nodeId, els) {
    if (!els && !els.length) throw new Error('Element is required for render')
    if (!nodeId) throw new Error('Node id is required for render')
    this.render(document.getElementById(nodeId), els)
  }
}