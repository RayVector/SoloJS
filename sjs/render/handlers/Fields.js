class Fields {
  handle(field) {
    if (typeof field === 'function') return field()
    else return field
  }
}

export default Fields