/**
 * Element engine
 */
import Sjs_render from '../render/Sjs_render'

export default class extends Sjs_render {
  name = this.constructor.name
  data = {}
  template = {
    id: '',
    node: '',
    content: '',
    methods: [],
  }
  styles = {}
  methods = {}
  isPrepared = false

  constructor() {
    super()
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
          if (this.isPrepared) this.rerender(this)
        },
      })
    })

  }

  create() {
    this.prepare()
    this.changeData(this.data)

    /**
     * created lifecycle part
     */
    this.isPrepared = true
    return this
  }

}