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
    this.props = props
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
    for (const [key, value] of Object.entries(newData)) {
      if (!this.data[key]) {
        SJS_Error(`Not found "${key}" in component '${this.name}', fields:`, this.data)
        return false
      }

      if (this[key] !== value) this[key] = value
    }

    return true
  }

  prepare() {
    Object.keys(this.data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this['_' + key]
        },

        // add call stack for render to rerender all pack, no by one property
        set(value) {
          this['_' + key] = value
          this.setProps()
          if (this.isPrepared) this.rerender(this)
        },
      })
    })
  }

  setProps() {
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

  create() {
    this.prepare()
    this.changeData(this.data)

    /**
     * created lifecycle part
     */
    this.isPrepared = true
    this.created()
    return this
  }

}