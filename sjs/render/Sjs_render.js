/**
 * DOM template engine
 */
import Events from './handlers/Events'
import Fields from './handlers/Fields'

export default class {

  useStyles(node, el) {
    for (let [key, value] of Object.entries(el.styles)) {
      node.style[key] = new Fields().handle(value)
    }
  }

  useTemplate(node, el) {
    // template
    const { template, methods, name } = el
    if (!name) throw new Error('Element Name is required')

    const { id, content } = template
    if (id) node.setAttribute('id', id)
    node.setAttribute('name', name)
    node.innerHTML = new Fields().handle(content)


    //methods
    if (template.methods && template.methods.length) {
      document.addEventListener('DOMContentLoaded', function(event) {
        template.methods.forEach(method => {
          const event = new Events().handle(method.type)
          node.addEventListener(event, methods[method.name])
        })
      })

      document.removeEventListener('DOMContentLoaded', () => {
      })
    }
  }

  rerender(el) {
    if (!el.name) throw new Error('Element Name is required')
    const oldNode = document.querySelector(`[name=${el.name}]`)
    if (oldNode) oldNode.replaceWith(this.buildNode(el))
  }

  buildNode(el) {
    if (!el) throw new Error('Element is required')
    // create node
    let node = document.createElement(el.template.node || 'div')
    if (el.template) this.useTemplate(node, el)
    if (el.styles) this.useStyles(node, el)

    if (typeof node === 'object') return node
    return null
  }

  mountNode(parent, el) {
    parent.appendChild(el)
  }

  render(parent, els) {
    els.forEach(el => this.mountNode(parent, this.buildNode(el)))
  }
}

// addElState(el) {
//   for (let [key, value] of Object.entries(this.state)) {
//     if (el.hasOwnProperty(key)) {
//       for (let [prop, propValue] of Object.entries(value)) {
//         el[key][prop] = propValue
//       }
//     } else el[key] = value
//   }
// }
//
//
// addProps(node, el) {
//   for (let [key, value] of Object.entries(el.props)) {
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
//   // observe el:
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