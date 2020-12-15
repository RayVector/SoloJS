/**
 * DOM template engine
 */
import Events from './handlers/Events'
import Fields from './handlers/Fields'
import SJS_Error from '../utils/SJS_Error'

export default class {

  /**
   * void
   * add styles to node
   */
  useStyles(node, element) {
    for (let [key, value] of Object.entries(element.styles)) {
      node.style[key] = new Fields().handle(value)
    }
  }

  /**
   * void
   * setup html to node
   */
  useTemplate(node, element) {
    // template
    const { template, methods, name } = element
    if (!name) {
      SJS_Error(`Element Name is required`)
      return
    }

    const { id, content } = template
    if (id) node.setAttribute('id', id)
    node.setAttribute('name', name)
    node.setAttribute('uuid', element.$id)
    // set node content
    node.innerText = new Fields().handle(content)

    //methods (events)
    if (template.events && template.events.length) {
      template.events.forEach(event => {
        const handledEvent = new Events().handle(event.type)
        node.addEventListener(handledEvent, e => {
          // if isSelf
          if (event.isSelf) {
            if (node === e.target) methods[event.name](e)
          } else {
            methods[event.name](e)
          }
        })
      })
    }
  }


  /**
   * void
   * this method calls child method 'get props' for passing props to child
   */
  setProps(component) {
    if (component.childList.length) {
      // give props
      component.childList.forEach(child => {
        if (child.component && child.props) {
          for (let [key, value] of Object.entries(child.props)) {
            child.component.getProps({
              [key]: new Fields().handle(value),
            })
          }
        }

        // set emits
        if (child.emitEvents) child.component.getEmits(child.emitEvents)

      })
    }
  }

  /**
   * void
   * component rerendered
   * f this.setProps
   * f this.componentNodeReducer
   */
  rerender(component) {
    this.setProps(component)

    let oldNode = null
    if (!component.name) {
      SJS_Error(`Element Name is required`)
      return
    }

    if (!component.$id) {
      SJS_Error(`Element $id is required`)
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      oldNode = document.querySelector(`[uuid=${component.$id}]`)
      if (oldNode) oldNode.replaceWith(this.componentNodeReducer(component))
    }
    component.rerendered(component)
  }

  /**
   * @returns {HTMLElement}
   * f this.useTemplate
   * f this.useStyles
   */
  buildNode(component) {
    // create node
    let node = document.createElement(component.template.node || 'div')
    if (component.template) this.useTemplate(node, component)
    if (component.styles) this.useStyles(node, component)


    if (typeof node === 'object') return node
    return null
  }

  /**
   * @returns {HTMLElement}
   * !recursion! while child in childList
   * component with child mounted
   * f this.componentNodeReducer
   * f this.buildNode
   */
  componentNodeReducer(component) {
    // accumulator
    let rootNode = null

    // first acc
    if (!rootNode) {
      rootNode = this.buildNode(component)
    }

    if (component.childList && component.childList.length) {
      component.childList.forEach(child => {
        const optionalChild = child.component ? child.component : child
        // mounting
        rootNode.appendChild(this.componentNodeReducer(optionalChild))
      })
    }
    if (component.mounted) component.mounted(component)
    // node
    return rootNode
  }

  /**
   * void
   * component mounted
   * f this.componentNodeReducer
   * f this.buildNode
   */
  render(parentNode, els) {
    els.forEach(component => {
      // children's
      if (component.childList && component.childList.length) {
        parentNode.appendChild(this.componentNodeReducer(component))
      } else {
        // no children's
        component.mounted(component)
        const builtChild = this.buildNode(component)
        parentNode.appendChild(builtChild)
      }
    })
  }
}

//
// setWatcher(node) {
//   // observe element:
//   const config = {
//     childList: true,
//     subtree: true,
//     attributes: true,
//     characterDataOldValue: true,
//     characterData: true,
//     attributeOldValue: true,
//   }
//
//   const callback = function(mutationsList) {
//     for (let mutation of mutationsList) {
//       if (mutation.type === 'childList') {
//         const oldValue = []
//
//         if (mutation.removedNodes.length > 0) mutation.removedNodes.forEach(node => {
//           if (node.data) return oldValue.push(node.data)
//         })
//
//         const newValue = []
//         if (mutation.addedNodes.length > 0) mutation.addedNodes.forEach(node => {
//           if (node.data) return newValue.push(node.data)
//         })
//
//         // 4DEV:
//         if (oldValue.length > 0) console.log('observer.oldValue:', oldValue)
//         if (newValue.length > 0) console.log('observer.newValue:', newValue)
//       }
//     }
//   }
//
//   const observer = new MutationObserver(callback)
//   observer.observe(node, config)
// }