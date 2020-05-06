export default class {
  constructor(nodeId) {
    this.appNode = null;
    this.init(nodeId)
  }

  init(nodeId) {
    if (nodeId === String || nodeId !== undefined) {
      // mount:
      this.appNode = document.getElementById(nodeId);
    }
  }

  // new element:
  buildNode(el) {
    let node = document.createElement(el.node || "div");
    // add props:
    if (el.id) this.addNodeId(node, el);
    if (el.content) this.addNodeContent(node, el);
    if (el.styles) this.addNodeStyles(node, el);
    if (el.methods) if (Object.keys(el.methods).length > 0) this.addNodeMethods(node, el);

    if (node) {
      // Observe:
      const config = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
        characterDataOldValue: true,
        attributeOldValue: true,
      };
      const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            const oldValue = [];
            mutation.removedNodes.forEach(node => oldValue.push(node.data));
            const newValue = [];
            mutation.addedNodes.forEach(node => newValue.push(node.data));
            // console.log('oldValue:', oldValue);
            // console.log('newValue:', newValue);
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

  createNode(node, parent = null) {
    // create node

    if (parent) {
      let parentNode = this.buildNode(parent);
      parentNode.appendChild(this.buildNode(node));
      this.appNode.appendChild(parentNode)
    } else {
      if (!node.hasOwnProperty('childList') || node.childList.length < 0) {
        this.appNode.appendChild(this.buildNode(node))
      }
    }
  }

  // middleware:
  treeController(el, parent) {
    if (el.hasOwnProperty('childList') && el.childList.length > 0) {
      el.childList.forEach(child => this.treeController(child, el));
      this.createNode(el, null)
    } else {
      this.createNode(el, parent)
    }
  }

  // main el function:
  el(el) {
    this.treeController(el)
  }

  addNodeId(node, el) {
    node.attribute = "id";
    node.setAttribute("id", el.id);
  }

  addNodeContent(node, el) {
    node.innerHTML = el.content;
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

