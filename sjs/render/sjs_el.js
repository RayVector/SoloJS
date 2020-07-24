import sjs_render from "./sjs_render";

export default class extends sjs_render {
  constructor(el) {
    super();
    this.el = el
    console.log(el)
  }
}