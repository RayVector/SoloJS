export default class {
  constructor({ root, store }) {
    this.$store = store
    this.appNode = null
  }

  getInfo() {
    console.log(this)
  }

  render(nodeId) {
    // mounting
    if (nodeId === String || nodeId !== undefined) this.appNode = document.getElementById(nodeId)
  }

}