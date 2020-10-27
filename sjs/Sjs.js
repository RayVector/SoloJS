/**
 * The Core
 */
import Sjs_render from './render/Sjs_render'

export default class extends Sjs_render {
  constructor({ root, store }) {
    super()
    this.$root = root
    this.$store = store
    this.appNode = null
  }

  init(nodeId) {
    // get root DOM node
    if (nodeId === String || nodeId !== undefined) this.appNode = document.getElementById(nodeId)

    this.render(this.$root, this.appNode)
  }

}