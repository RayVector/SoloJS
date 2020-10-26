export default class {
  constructor({ root, store }) {
    this.$store = store
    this.appNode = null
  }

  getInfo() {
    console.log(this)
  }

  render(nodeId) {
    if (nodeId === String || nodeId !== undefined) {
      // find place for mounting:
      this.appNode = document.getElementById(nodeId)
    }
  }


}