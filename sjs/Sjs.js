/**
 * The Core
 */
import Sjs_render from './render/Sjs_render'

export default {
  init(nodeId, root) {
    new Sjs_render().render(document.getElementById(nodeId), root)
  }
}