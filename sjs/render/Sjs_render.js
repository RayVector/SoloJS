/**
 * DOM manipulator engine
 */

export default {
  appNode: null,
  chain: null,
  state: {},

  addElState: function(el) {
    for (let [key, value] of Object.entries(this.state)) {
      if (el.hasOwnProperty(key)) {
        for (let [prop, propValue] of Object.entries(value)) {
          el[key][prop] = propValue
        }
      } else el[key] = value
    }
  },

  useLayout: function(node, layout) {
    const { id, content } = layout
    node.setAttribute('id', id)
    node.innerHTML = content
  },

  addProps: function(node, el) {
    for (let [key, value] of Object.entries(el.props)) {
      node.setAttribute(key, value)
    }
  },

  addNodeStyles: function(node, el) {
    for (let [key, value] of Object.entries(el.styles)) {
      node.style[key] = value
    }
  },

  rerender: function(el) {
    if (!el.name) {
      return
    }
    const oldNode = document.getElementById(el.name)
    if (oldNode) oldNode.replaceWith(this.buildNode(el))
  },

  useMethods: function(node, methods) {
    document.addEventListener('DOMContentLoaded', function(event) {
      for (const [key, value] of Object.entries(methods)) {
        if (methods.hasOwnProperty(key)) {
          //if (el.bind) methods[key](e, document.getElementById(el.bind))
          node.addEventListener(value.type, e => value.func(e))
        }
      }
    })

    document.removeEventListener('DOMContentLoaded', () => {
    })
  },

  setWatcher: function(node) {
    // observe el:
    const config = {
      childList: true,
      subtree: true,
      attributes: true,
      characterDataOldValue: true,
      characterData: true,
      attributeOldValue: true,
    }

    const callback = function(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const oldValue = []

          if (mutation.removedNodes.length > 0) mutation.removedNodes.forEach(node => {
            if (node.data) return oldValue.push(node.data)
          })

          const newValue = []
          if (mutation.addedNodes.length > 0) mutation.addedNodes.forEach(node => {
            if (node.data) return newValue.push(node.data)
          })

          // 4DEV:
          if (oldValue.length > 0) console.log('observer.oldValue:', oldValue)
          if (newValue.length > 0) console.log('observer.newValue:', newValue)
        }
      }
    }

    const observer = new MutationObserver(callback)
    observer.observe(node, config)
  },

  // create node:
  buildNode: function(el) {
    //console.log('buildNode:', el)
    if (!el) return false

    // create node
    let node = document.createElement(el.layout.node || 'div')

    // engine instance variable in each el:
    //node.$sjs = this

    // add props to el:
    //if (el.props) this.addProps(node, el)
    //if (el.styles) this.addNodeStyles(node, el)
    //this.addElState(el)

    /**
     * layout
     */
    if (el.layout) this.useLayout(node, el.layout)

    /**
     * methods
     */
    if (el.methods) this.useMethods(node, el.methods)

    if (typeof node === 'object') {
      /**
       * watcher
       */
      this.setWatcher(node)
      return node
    } else {
      return null
    }

  },

  mountNode: function(el, node) {
    // accumulating variable:
    this.chain = node ? node : this.buildNode(el)
    if (el.hasOwnProperty('childList') && el.childList.length > 0) {
      // 1 child layer:
      el.childList.forEach(child => {
        this.chain.appendChild(this.buildNode(child))
        if (this.chain) this.appNode.appendChild(this.chain)
      })
    } else {
      this.appNode.appendChild(this.chain)
    }
    // reset accumulating:
    this.chain = null
  },

  // main el function:
  render: function(root, appNode) {
    appNode = appNode
    //console.log('mountNode', { root, appNode })
    this.mountNode(root)
  },
}

