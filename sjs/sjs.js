export default class {
  constructor({nodeId, store}) {
    this.nodeId = nodeId;
    this.$store = store;
  }

  getInfo() {
    console.log(this)
  }

}