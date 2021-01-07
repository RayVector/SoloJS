/**
 * Element engine
 */
import Sjs_render from '../render/Sjs_render'
import SJS_Error from '../utils/SJS_Error'
import { v4 as uuid } from 'uuid'

export default class {
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
      //SJS_Error(`Emit '${name}' not found in component '${this.name}', component emits:`, this.emits)
      return false
    }

    this.emits[name](data)
  }

  changeData(newData) {
    // TODO: add old/new values validation (strings, arrays, objects, booleans, numbers) this[key] !== value

    for (const [key, value] of Object.entries(newData)) {
      if (!this.data[key]) {
        SJS_Error(`Not found "${key}" in component '${this.name}', fields:`, this.data)
        return false
      }

      this[key] = value
    }

    if (this.isPrepared) Sjs_render.rerender(this)

    return true
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
    this.isPrepared = true
    this.created(this)
    return this
  }

}