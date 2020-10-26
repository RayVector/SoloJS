export default class {
  constructor(store) {
    this.state = store.state;
    this.actions = store.actions;
  }
}