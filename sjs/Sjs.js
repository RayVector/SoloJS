/**
 * The Core
 */
import Sjs_render from './render/Sjs_render'
import SJS_Error from './utils/SJS_Error'

export default class extends Sjs_render {

  /**
   * void
   * this method change component childList -
   * calls every child (and child of child) as function for list rendering
   */
  prepareChildList(component) {
    const preparedChildList = []
    component.childList.forEach(child => {
      if (typeof child === 'function') {
        child().forEach(innerChild => {
          preparedChildList.push(innerChild)
        })
      } else preparedChildList.push(child)
    })
    component.childList = preparedChildList
  }

  /**
   * @returns {Object}
   * class init in deep
   * !recursion! while child in childList
   * f this.prepareChildList
   * f this.initChild
   * f this.setProps
   */
  initChild(component) {
    const createdComponent = new component().create()
    this.prepareChildList(createdComponent)

    if (createdComponent.childList.length) {
      createdComponent.childList.forEach(child => {
        if (child.component) {
          child.component = this.initChild(child.component)
        }
      })
    }

    // set props
    this.setProps(createdComponent)
    return createdComponent
  }


  /**
   * void
   * f this.render
   * f this.combine
   */
  init(nodeId, els) {
    if (!els || !els.length) {
      SJS_Error('Sjs init: Element is required for render')
      return
    }

    if (!nodeId) {
      SJS_Error('Sjs init: Node id is required for render')
      return
    }

    this.render(document.getElementById(nodeId), els.map(el => this.initChild(el)))
  }
}