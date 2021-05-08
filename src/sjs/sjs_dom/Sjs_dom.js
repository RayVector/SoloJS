export let flatTree = []

export const activeInputOnReplace = activeNodeElement => {
  const oldActiveElement = flatTree[activeNodeElement.$depthLevel]
  if (oldActiveElement) {
    oldActiveElement.focus()
    if (typeof oldActiveElement.selectionStart == 'number') {
      oldActiveElement.selectionStart = oldActiveElement.selectionEnd = oldActiveElement.value.length
    } else if (typeof oldActiveElement.createTextRange != 'undefined') {
      oldActiveElement.focus()
      let range = oldActiveElement.createTextRange()
      range.collapse(false)
      range.select()
    }
  }
}

export const replaceNode = (currentNode, newUnit) => {
  const activeNodeElement = document.activeElement
  const newNode = createNode(newUnit)
  currentNode.replaceWith(newNode)
  if (activeNodeElement) activeInputOnReplace(activeNodeElement)

  newUnit.updated = (cb) => {
    cb(newUnit)
  }
  return newUnit
}

export const clearFlatTree = () => flatTree = []

export const addNode = (node, secondNode) => node.appendChild(secondNode)

export const setNodeAttribute = (node, { name, value }) => {
  node.setAttribute(name, value)
}

export const createNode = unit => {
  const newNode = document.createElement(unit.$node || 'div')
  flatTree.push(newNode)
  // preparedContent
  if (unit.preparedContent && unit.preparedContent.length) {
    unit.preparedContent.forEach(contentItem => {
      if (typeof contentItem === 'object') addNode(newNode, createNode(contentItem))
    })
  }

  // content
  // TODO: refactor (simplify)
  if (typeof unit === 'object' && unit.content && Array.isArray(unit.content)) {
    unit.content = unit.content.filter(contentItem => !contentItem.hasOwnProperty('render'))
    if (unit.content.length) newNode.innerHTML = unit.content.join()
  } else if (typeof unit === 'string') {
    newNode.innerHTML = unit
  } else {
    if (unit.content && unit.content.length) newNode.innerHTML = unit.content
  }
  // events
  if (unit.events && unit.events.length) unit.events.forEach(event => {
    newNode.addEventListener(event.type, event.cb)
  })
  // styles
  if (unit.styles) setNodeStyles(newNode, unit.styles)
  // css classes
  if (unit.classes) {
    unit.classes.forEach(attrClass => {
      setNodeAttribute(newNode, { name: 'class', value: attrClass })
    })
  }
  // css
  if (unit.css) createNodeCss(newNode, unit.css)
  // value
  if (unit.value) {
    setNodeAttribute(newNode, { name: 'value', value: unit.value })
  }

  newNode.$depthLevel = unit.$depthLevel
  return newNode
}

const setNodeStyles = (node, styles) => {
  for (let [key, value] of Object.entries(styles)) {
    node.style[key] = value
  }
}

const createNodeCss = (node, css) => {
  for (let [key, value] of Object.entries(css)) {
    let style = document.createElement('style')
    style.type = 'text/css'
    const styleValue = JSON.stringify(value)
      .replace(/"/g, '')
      .replace(/,/g, ';')
    style.innerHTML = `.${key}${styleValue}`
    document.head.appendChild(style)
  }

}

export let appNodeId = null

export const buildRoot = (nodeId, unit) => {
  appNodeId = nodeId
  addNode(document.getElementById(nodeId), createNode(unit))
}
