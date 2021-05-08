import { clearFlatTree, flatTree, replaceNode } from '../sjs_dom/Sjs_dom'

let depthLevel = 0

export const renderList = (data) => {
  const {
    i,
    list,
    component,
    props,
    events
  } = data

  return i.data[list].map((item, index) => {
    const user = Object.assign({}, component)
    user.props = {}
    props.forEach(prop => user.props[prop] = item[prop])
    events.forEach(event => {
      user.props[event.name] = event(i)
    })
    return user
  })
}

export const changeData = (i) => {
  // const currentNode = treeFinder(document.getElementById(appNodeId).children, newData.$depthLevel)
  depthLevel = 0
  const currentNode = flatTree[i.$depthLevel]
  clearFlatTree()
  const newNode = prepare(i, true)
  return replaceNode(currentNode, newNode)
}

export const prepareContent = (content, item, isUpdate = false) => {
  item.preparedContent = []
  if (Array.isArray(content)) {
    content.forEach(contentItem => {
      if (typeof contentItem === 'object') {
        contentItem.$node = contentItem.node
        item.preparedContent.push(prepare(contentItem, isUpdate))
      } else {
        item.preparedContent.push(contentItem)
      }
    })
  } else {
    item.preparedContent.push(content)
  }
}

export const prepare = (unit, isUpdate = false) => {
  if (unit.hasOwnProperty('$depthLevel')) {
    unit.$depthLevel = depthLevel
    depthLevel = 1
  } else unit.$depthLevel = depthLevel++
  if (unit.render) {
    const render = unit.render(unit)
    if (render.content && render.content.length) prepareContent(render.content, unit, isUpdate)
    if (render.events && render.events.length) {
      unit.events = render.events
    }
    if (render.styles) unit.styles = render.styles
  } else {
    if (unit.content && unit.content.length) prepareContent(unit.content, unit, isUpdate)
  }

  if (unit.events && unit.events.length) {
    const preparedEvents = []
    unit.events.forEach(unitEvent => {
      if (typeof unitEvent === 'function') {
        // stoped here: add events to non listed node
        preparedEvents.push(unitEvent())
      }
      else preparedEvents.push(unitEvent)
    })
    unit.events = preparedEvents
  }

  // get props
  // set props
  // set emits
  // get emits
  // $preparedContent
  // $node
  return unit
}


// export const renderList = (arr, component, eventCB = () => {}) => {
//   return arr.map((item, index) => {
//     eventCB({item, index, arr})
//     const { id, name } = item
//     const user = Object.assign({}, component)
//     user.props = { id, name }
//     return user
//   })
// }

// let treeDepthLevel = 0;
// const treeFinder = (nodes, depthLevel) => {
//   if (nodes.length) {
//     for (let node of nodes) {
//       node.$treeDepthLevel = treeDepthLevel++
//       if (depthLevel === node.$treeDepthLevel) return node
//       if (node.children && node.children.length) treeFinder(node.children)
//     }
//   }
// }
