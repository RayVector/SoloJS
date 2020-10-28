/**
 * The Core
 */
import Sjs_render from './render/Sjs_render'

export default {
  constructor({ root, store }) {
    this.$root = root
    this.$store = store
    this.appNode = null
  },

  init(nodeId) {
    // get root DOM node
    if (nodeId === String || nodeId !== undefined) this.appNode = document.getElementById(nodeId)

    Sjs_render.render(this.$root, this.appNode)
  },

}