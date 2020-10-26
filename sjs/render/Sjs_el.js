export default class {
  constructor({ methods, components, data, layout, styles }) {
    this.$methods = methods
    this.$components = components
    this.$data = data
    this.$layout = layout
    this.$styles = styles
    this.render = function() {
      console.log('rendering...')
    }
    console.log(this)
  }
}