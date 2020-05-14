import Engine from "./Engine";

export default class extends Engine {
  // main el function:
  el(el) {
    this.mountNode(el);
  }
}

