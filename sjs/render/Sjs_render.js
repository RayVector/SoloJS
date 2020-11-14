/**
 * DOM template engine
 */
import Events from './handlers/Events'
import Fields from './handlers/Fields'

export default class {

  /**
   * void
   */
  useStyles(node, element) {
    for (let [key, value] of Object.entries(element.styles)) {
      node.style[key] = new Fields().handle(value)
    }
  }

  /**
   * void
   */
  useTemplate(node, element) {
    // template
    const { template, methods, name } = element
    if (!name) throw new Error('Element Name is required')

    const { id, content } = template
    if (id) node.setAttribute('id', id)
    node.setAttribute('name', name)
    // mounted
    element.mounted()
    node.innerText = new Fields().handle(content)

    //methods (events)
    if (template.events && template.events.length) {
      document.addEventListener('DOMContentLoaded', function(event) {
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
      })

      document.removeEventListener('DOMContentLoaded', () => {
      })
    }
  }

  /**
   * void
   */
  rerender(element) {
    if (!element.name) throw new Error('Element Name is required')
    const oldNode = document.querySelector(`[name=${element.name}]`)
    if (oldNode) oldNode.replaceWith(this.elementNodeReducer(element))
  }

  /**
   * @returns {HTMLElement}
   */
  buildNode(element) {
    if (!element) throw new Error('Element is required')
    // create node
    let node = document.createElement(element.template.node || 'div')
    if (element.template) this.useTemplate(node, element)
    if (element.styles) this.useStyles(node, element)


    if (typeof node === 'object') return node
    return null
  }

  /**
   * @returns {HTMLElement}
   */
  elementNodeReducer(element) {
    // accumulator
    let rootNode = null

    // first acc
    if (!rootNode) {
      rootNode = this.buildNode(element)
    }

    // recursion!
    if (element.childList && element.childList.length) {
      element.childList.forEach(child => {
        // mounting
        rootNode.appendChild(this.elementNodeReducer(child.component ? child.component : child))
      })
    }

    // node
    return rootNode
  }

  /**
   * void
   */
  mountInit(parentNode, els) {
    els.forEach(element => {
      // children's
      if (element.childList && element.childList.length) {
        parentNode.appendChild(this.elementNodeReducer(element))
      } else {
        // no children's
        const builtChild = this.buildNode(element)
        parentNode.appendChild(builtChild)
      }
    })
  }

  /**
   * void
   */
  render(parentNode, els) {
    this.mountInit(parentNode, els)
  }
}

// addElState(element) {
//   for (let [key, value] of Object.entries(this.state)) {
//     if (element.hasOwnProperty(key)) {
//       for (let [prop, propValue] of Object.entries(value)) {
//         element[key][prop] = propValue
//       }
//     } else element[key] = value
//   }
// }
//
//
// addProps(node, element) {
//   for (let [key, value] of Object.entries(element.props)) {
//     node.setAttribute(key, value)
//   }
// }
//
//
// useMethods(node, methods) {
//
// }
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