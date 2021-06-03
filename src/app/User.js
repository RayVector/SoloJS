import { updateApp } from '../sjs/sjs_unit/Sjs_unit'
import { $click, $input } from '../sjs/sjs_dom/Sjs_dom_events'

const r_id = i => ({
  node: 'span',
  content: [`[${i.props.id}] `]
})

const r_name = i => ({
  node: 'span',
  styles: {
    marginRight: '5px'
  },
  content: [i.props.name],
  events: [
    i.props.m_updateName({ id: i.props.id })
  ]
})

const r_editButton = i => ({
  node: 'button',
  content: 'edit',
  styles: {
    marginRight: '5px'
  },
  events: [
    {
      type: $click,
      cb: () => {
        i.data.isEditInputShown = !i.data.isEditInputShown
        updateApp()
      }
    }
  ]
})

const r_editNameInput = i => ({
  node: 'input',
  styles: {
    marginRight: '5px'
  },
  if: i.data.isEditInputShown,
  value: i.data.userNameEdit,
  events: [
    {
      type: $input,
      cb: e => {
        i.data.userNameEdit = e.target.value
        updateApp()
      }
    }
  ]
})

const render = i => ({
  node: 'div',
  styles: {
    marginBottom: '5px'
  },
  content: [
    r_id(i),
    r_name(i),
    r_editButton(i),
    r_editNameInput(i)
  ]
})

const data = {
  isEditInputShown: false,
  userNameEdit: ''
}

export default {
  data,
  render
}
