/**
 * Element engine
 */

export default class {
  name = null
  layout = null
  methods = null

  constructor() {

  }

  get data() {
    return this._data
  }

  set data(changedData) {
    this._data = changedData
    console.log('data:', changedData)
  }

  changeData(newData) {
    Object.assign(this.data, newData)
  }

  bind(callback) {
    return this.data[callback()]
  }

  create() {
    this.methods.changeText()
    console.log('this:', this)
    return this
  }


}