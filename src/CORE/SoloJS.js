export default class {
  constructor(nodeId) {
    this.appNode = null;
    this.chainedNode = null;
    this.init(nodeId)
  }

  init(nodeId) {
    if (nodeId === String || nodeId !== undefined) {
      // mount:
      this.appNode = document.getElementById(nodeId);
    }
  }

  // create node:
  buildNode(el) {
    let node = document.createElement(el.node || "div");
    // add props:
    if (el.id) this.addNodeId(node, el);
    if (el.content) this.addNodeContent(node, el);
    if (el.props) this.addProps(node, el);
    if (el.styles) this.addNodeStyles(node, el);
    if (el.methods) if (Object.keys(el.methods).length > 0) this.addNodeMethods(node, el);

    if (node) {
      // Observe:
      const config = {
        childList: true,
        subtree: true,
        attributes: true,
        characterDataOldValue: true,
        characterData: true,
        attributeOldValue: true,
      };
      const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const oldValue = [];
            if (mutation.removedNodes.length > 0) mutation.removedNodes.forEach(node => {
              if (node.data) return oldValue.push(node.data)
            });
            const newValue = [];
            if (mutation.addedNodes.length > 0) mutation.addedNodes.forEach(node => {
              if (node.data) return newValue.push(node.data)
            });
            if (oldValue.length > 0) console.log('oldValue:', oldValue);
            if (newValue.length > 0) console.log('newValue:', newValue);
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(node, config);

      return node
    } else {
      return null
    }

  }

  // mount:
  mountNode(el) {
    if (el.hasOwnProperty('childList') && el.childList.length > 0) {
      // chaining:
      this.chainedNode = this.buildNode(el);
      el.childList.forEach(child => {
        this.chainedNode.appendChild(this.buildNode(child))
      });
      this.appNode.appendChild(this.chainedNode);
    } else {
      // unchain:
      this.chainedNode = null;
      this.appNode.appendChild(this.buildNode(el))
    }
  }

  // main el function:
  el(el) {
    this.mountNode(el)
  }

  addNodeId(node, el) {
    node.attribute = "id";
    node.setAttribute("id", el.id);
  }

  addNodeContent(node, el) {
    node.innerHTML = el.content;
  }

  addProps(node, el) {
    for (let [key, value] of Object.entries(el.props)) {
      node.setAttribute(key, value)
    }
  }

  addNodeStyles(node, el) {
    for (let [key, value] of Object.entries(el.styles)) {
      node.style[key] = value;
    }
  }

  addNodeMethods(node, el) {
    document.addEventListener("DOMContentLoaded", function (event) {
      for (let key in el.methods) {
        if (el.methods.hasOwnProperty(key)) {
          node.addEventListener(key, e => {
            if (el.bind) {
              el.methods[key](e, document.getElementById(el.bind))
            } else {
              el.methods[key](e)
            }
          })
        }
      }
    });
  }
}

