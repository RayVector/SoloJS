// parsing HTML from JS engine
import {v4 as uuidv4} from 'uuid'


// Add default el state:
let state = {
  styles: {
    // position: 'absolute'
  }
};


export default class {
  constructor(nodeId) {
    this.appNode = null;
    this.chain = null;
    this.$id = `SJS-${uuidv4()}`;
    this.init(nodeId)
  }

  init(nodeId) {
    if (nodeId === String || nodeId !== undefined) {
      // find mount place:
      this.appNode = document.getElementById(nodeId);
    }
  }

  addElState(el) {
    if (!el.uid) el.uid = uuidv4();
    if (this.$id) el.$id = this.$id;
    if (!el.props) el.props = {};
    el.props['data-id'] = el.uid;
    el.props['data-SJS_id'] = this.$id;

    for (let [key, value] of Object.entries(state)) {
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

  // create node:
  buildNode(el) {
    let node = document.createElement(el.node || "div");
    // add props:
    this.addElState(el);
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
    this.chain = this.buildNode(el);
    if (el.hasOwnProperty('childList') && el.childList.length > 0) {
      el.childList.forEach(child => {
        this.chain.appendChild(this.buildNode(child));
        if (this.chain) this.appNode.appendChild(this.chain);
      });
    } else {
      this.appNode.appendChild(this.chain);
    }
    this.chain = null;
  }

  // main el function:
  el(el) {
    this.mountNode(el)
  }
}

