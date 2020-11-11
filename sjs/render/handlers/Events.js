const types = {
  click: 'click',
}


class Events {
  handle(type) {
    return types[type]
  }
}

export default Events