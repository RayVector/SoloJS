/**
 * Element engine
 */
import Sjs_render from '../render/Sjs_render'
import Fields from '../render/handlers/Fields'

export default class extends Sjs_render {
  name = this.constructor.name
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
  isPrepared = false

  mounted() {
    return true
  }

  created() {
    return true
  }

  constructor() {
    super()
  }

  getProps(props = {}) {
    this.props = props
  }

  // todo: create field validation (no similar fields)
  changeData(newData) {
    for (const [key, value] of Object.entries(newData)) {
      if (!this.data[key]) {
        throw new Error(`Not found "${key}" in "data"`)
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
          this.giveProps()
          if (this.isPrepared) this.rerender(this)
        },
      })
    })
  }

  giveProps() {
    this.childList.forEach(child => {
      if (child.component) {
        for (let [key, value] of Object.entries(child.props)) {
          child.component.getProps({
            [key]: new Fields().handle(value),
          })
        }
      }
    })
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