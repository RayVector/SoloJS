import { clearFlatTree, flatTree, replaceNode, rootUnit } from '../sjs_dom/Sjs_dom'
import { updatedDiff } from 'deep-object-diff'
import { $click, $input } from '../sjs_dom/Sjs_dom_events'

let depthLevel = 0

export const renderList = (data, key = null) => {
  const {
    i,
    list,
    component,
    props,
    events
  } = data

  return i.data[list].map((item, index) => {
    const listItem = new component()
    listItem._listKey = key !== null ? item[key] : index
    listItem.props = {}
    props.forEach(prop => listItem.props[prop] = item[prop])
    events.forEach(event => {
      listItem.props[event.name] = event(i)
    })
    return listItem
  })
}

export const updateApp = () => {
  console.log('updateApp', rootUnit)
  // const currentNode = flatTree[0]
  // if (!currentNode) return false
  // if (Object.values(updatedDiff(i, currentNode.$unit)).length) {
  //   // depthLevel = i.$depthLevel
  //   // clearFlatTree()
  //   const newNode = prepare(i, true)
  //   return replaceNode(currentNode, newNode)
  // }
  // const newNode = prepare(rootUnit, true)
  return replaceNode(flatTree[0], prepare(rootUnit, true))
  // return false
}

export const prepareContent = (content, item, isUpdate = false) => {
  const updatedContent = []
  if (Array.isArray(content)) {
    content.forEach(contentItem => {
      if (contentItem && typeof contentItem === 'object') {
        contentItem.$node = contentItem.node
        updatedContent.push(prepare(contentItem, isUpdate))
      } else {
        updatedContent.push(contentItem)
      }
    })
  } else {
    updatedContent.push(content)
  }
  item.preparedContent = updatedContent
}

export const setDepthLevel = unit => {
  if (!unit.hasOwnProperty('$depthLevel')) {
    unit.$depthLevel = depthLevel++
  }
}

export const prepare = (unit, isUpdate = false) => {
  // проблема в обнулении дерева и настройки уровня глубины у компонента
  // возможно вынести i в глобальный стейт, миновав локальный стейт, но это лишит универсальности компонентов
  // требуется настройка дерева и механизма определения уровня глубины компонента
  // не менять глубину общую и локлаьную если при обновлении компонент найден в плоском дереве
  // TODO: stoped here
  if (unit.$depthLevel === undefined || unit.$depthLevel === null) setDepthLevel(unit)


  // render
  if (unit.hasOwnProperty('render')) {
    const render = unit.render(unit)
    console.log(111, render)
    if (render.hasOwnProperty('content') && render.content.length) prepareContent(render.content, unit, isUpdate)
    if (render.hasOwnProperty('events') && render.events.length) unit.events = render.events
    if (render.hasOwnProperty('styles')) unit.styles = render.styles
  } else {
    if (unit.hasOwnProperty('content') && unit.content.length) prepareContent(unit.content, unit, isUpdate)

    // !moved from outside if else! need to test behaviour
    if (unit.hasOwnProperty('events') && unit.events.length) {
      const preparedEvents = []
      unit.events.forEach(unitEvent => {
        if (typeof unitEvent === 'function') {
          preparedEvents.push(unitEvent())
        } else preparedEvents.push(unitEvent)
      })
      unit.events = preparedEvents
    }
  }

  if (!unit.hasOwnProperty('if')) unit.if = true

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
