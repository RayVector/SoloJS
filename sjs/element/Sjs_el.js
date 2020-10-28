/**
 * Element manipulator
 */
import Sjs_render from '../render/Sjs_render'

export default class extends Sjs_render {
  constructor() {
    super()
    this.$name
    this._layout
    this._data
    this._methods
  }

  get data() {
    return this._data
  }

  set data(value) {
    this._data = value
    this.rerender(this.createElement())
    console.log('set data', value)
  }

  get methods() {
    return this._methods
  }

  set methods(value) {
    this._methods = value
    console.log('set methods', value)
  }

  get layout() {
    return this._layout
  }

  set layout(value) {
    this._layout = value
    console.log('set layout', value)
  }

  rel(map) {
    return map
  }

  createElement() {
    console.log('Layout:', this.layout)
    return {
      name: this.$name,
      data: this.getData,
      methods: this.methods,
      layout: this.layout,
    }
  }

  /**
   * 1
   * @returns {{layout: *, data: (format: string) => string, methods: *, name: string}}
   */
  create() {
    return this.createElement()
  }


}