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
    this.rerender(this.prepareElement())
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

  rel(key, map) {
    const el = this.prepareElement()
    console.log(0, this)
    console.log(1, map)
    console.log(2, this[key])
    console.log(3, this[key])
    console.log(4, this[map[0]])
    console.log(5, map[1])
    //this[key] = this[map[0]] = map[1]
    return this.data.changedText
  }

  prepareElement() {
    return {
      name: this.$name,
      data: this.getData,
      methods: this.methods,
      layout: this.layout,
    }
  }

  create() {
    return this.prepareElement()
  }


}