/**
 * Element engine
 */
import Sjs_render from '../render/Sjs_render'
import Fields from '../render/handlers/Fields'
import SJS_Error from '../utils/SJS_Error'
import { v4 as uuid } from 'uuid'

export default class extends Sjs_render {
  data = {}
  template = {
    id: '',
    node: '',
    content: '',
    events: [],
  }
  childList = []
  styles = {}
  methods = {}
  props = {}
  emits = {}
  isPrepared = false

  constructor() {
    super()
    this.$id = `SJS-${uuid()}`
    this.name = this.constructor.name
  }

  getProps(props = {}) {
    Object.assign(this.props, props)
  }

  getEmits(emits) {
    this.emits = emits
  }

  emit(name, data) {
    if (!this.emits[name]) {
      SJS_Error(`Emit '${name}' not found in component '${this.name}', component emits:`, this.emits)
      return false
    }

    this.emits[name](data)
  }

  changeData(newData) {
    this.setProps()

    for (const [key, value] of Object.entries(newData)) {
      if (!this.data[key]) {
        SJS_Error(`Not found "${key}" in component '${this.name}', fields:`, this.data)
        return false
      }
      // TODO: add old/new values validation (strings, arrays, objects, booleans, numbers) this[key] !== value
      this[key] = value
      if (this.isPrepared) this.rerender(this)
    }

    return true
  }

  prepareChildList() {
    const preparedChildList = []
    this.childList.forEach(child => {
      if (typeof child === 'function') child().forEach(innerChild => {
        preparedChildList.push(innerChild)
      })
      else preparedChildList.push(child)
    })
    this.childList = preparedChildList
  }

  setProps() {
    this.prepareChildList()

    // give props
    this.childList.forEach(child => {
      if (child.component) {
        for (let [key, value] of Object.entries(child.props)) {
          child.component.getProps({
            [key]: new Fields().handle(value),
          })
        }
      }

      // set emits
      if (child.emitEvents) child.component.getEmits(child.emitEvents)

    })
  }

  mounted() {
    return true
  }

  created() {
    return true
  }

  rerendered() {
    return true
  }

  create() {
    this.changeData(this.data)
    this.isPrepared = true
    this.created(this)
    return this
  }

}