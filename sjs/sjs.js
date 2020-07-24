export default class {
  constructor({nodeId, store}) {
    this.nodeId = nodeId;
    this.$store = store;
    this.appNode = null;
  }

  getInfo() {
    console.log(this)
  }

  init() {
    if (this.nodeId === String || this.nodeId !== undefined) {
      // find place for mounting:
      this.appNode = document.getElementById(this.nodeId);
    }
  }


}