import {v4 as uuidv4} from "uuid";

export default class {
  constructor() {
    this.$id = `SJS-${uuidv4()}`;
  }

  setUnicId(el) {
    el.$id = uuidv4()
  }
}