export default class {
  constructor(nodeId) {
    this.appNode = null;
    this.init(nodeId)
  }

  init(nodeId) {
    if (nodeId === String || nodeId !== undefined) {
      // mount:
      // attention:
      document.addEventListener("DOMContentLoaded", function (event) {
        this.appNode = document.getElementById(nodeId);
      });
    }
  }

  // new element:
  addEl(el) {
    let node = document.createElement(el.node || "div");

    if (el.id) this.addId(node, el);
    if (el.content) this.addContent(node, el);
    if (el.styles) this.addStyles(node, el);
    if (Object.keys(el.methods).length > 0) this.addMethods(node, el);

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
            console.log('oldValue:', oldValue);
            console.log('newValue:', newValue);
          }
        }
      };

      const observer = new MutationObserver(callback);

      observer.observe(node, config);

      this.appNode.appendChild(node);
    }

  }

  addId(node, el) {

    node.attribute = "id";
    node.setAttribute("id", el.id);
  }

  addContent(node, el) {
    node.innerHTML = el.content;
  }

  addStyles(node, el) {
    for (let [key, value] of Object.entries(el.styles)) {
      node.style[key] = value;
    }
  }

  addMethods(node, el) {
    document.addEventListener("DOMContentLoaded", function (event) {
      for (let key in el.methods) {
        if (el.methods.hasOwnProperty(key)) {
          node.addEventListener(key, e => {
            el.methods[key](e)
          })
        }
      }
    });
  }
}

