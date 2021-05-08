const r_styles = {
  marginBottom: '5px'
}

const r_id = i => ({
  node: 'span',
  content: [`[${i.props.id}] `]
})

const r_nameButton = i => ({
  node: 'button',
  content: [i.props.name],
  events: [
    i.props.m_updateName({ id: i.props.id })
  ]
})

const render = i => ({
  node: 'div',
  styles: r_styles,
  content: [
    r_id(i),
    r_nameButton(i)
  ]
})

export default {
  render
}
