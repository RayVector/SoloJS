import sjs from "../sjs";


export default class {
  constructor({nodeId, store}) {
    this.appNode = null;
    this.chain = null;
    this.nodeId = nodeId;
    this.$store = store;
    this.state = {
      styles: {
        // position: 'fixed',
        // display: 'block'
      }
    }
  }


  addElState(el) {
    for (let [key, value] of Object.entries(this.state)) {
      if (el.hasOwnProperty(key)) {
        for (let [prop, propValue] of Object.entries(value)) {
          el[key][prop] = propValue
        }
      } else el[key] = value
    }
  }

  addNodeId(node, el) {
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
            if (el.bind) el.methods[key](e, document.getElementById(el.bind));
            else el.methods[key](e)
          })
        }
      }
    });
  }

  // create node:
  buildNode(el) {
    if (!el) return false;

    let node = document.createElement(el.node || "div");
    // engine instance variable in each el:
    node.$sjs = this;

    // add props to el:
    this.addElState(el);
    if (el.id) this.addNodeId(node, el);
    if (el.content) this.addNodeContent(node, el);
    if (el.props) this.addProps(node, el);
    if (el.styles) this.addNodeStyles(node, el);
    if (el.methods) if (Object.keys(el.methods).length > 0) this.addNodeMethods(node, el);

    // add unic id:
    el.$id = this.setUnicId(el);

    // add store:
    el.$store = this.$store;

    if (node) {
      // observe el:
      const config = {
        childList: true,
        subtree: true,
        attributes: true,
        characterDataOldValue: true,
        characterData: true,
        attributeOldValue: true,
      };
      const callback = function (mutationsList) {
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
            // 4DEV:
            if (oldValue.length > 0) console.log('observer.oldValue:', oldValue);
            if (newValue.length > 0) console.log('observer.newValue:', newValue);
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

  mountNode(el) {
    // accumulating variable:
    this.chain = this.buildNode(el);
    if (el.hasOwnProperty('childList') && el.childList.length > 0) {
      // 1 child layer:
      el.childList.forEach(child => {
        this.chain.appendChild(this.buildNode(child));
        if (this.chain) this.appNode.appendChild(this.chain);
      });
    } else {
      this.appNode.appendChild(this.chain);
    }
    // reset accumulating:
    this.chain = null;
  }

  // main el function:
  render(el) {
    if (this.appNode !== null) {
      console.log(123, el);
      this.mountNode(el);
    } else {
      throw new Error('Render failed: appNode field is empty')
    }

  }

}

