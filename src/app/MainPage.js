import User from './User'
import { changeData, renderList } from '../sjs/sjs_unit/Sjs_unit'
import { $click, $input } from '../sjs/sjs_dom/Sjs_dom_events'

const m_updateName = i => {
  return ({ id }) => ({
    type: $click,
    cb: () => {
      // i.data.users.find(user => user.id === id).name = 'Vector'
      if (id === 1) {
        i.data.users[0].name = 'Vector'
        changeData(i)
      }

      // HOOK: updated
      // i.updated((newUnit) => {
      //   console.log('updated', newUnit)
      //   newUnit.data.users.push({
      //     id: 4,
      //     name: 'Mike'
      //   })
      //   changeData(newUnit)
      // })
    }
  })
}

const m_createUser = i => {
  return () => ({
    type: $click,
    cb: () => {
      const newName = i.data.newUserName
      if (newName && newName.length > 3) {
        i.data.users.push({
          id: i.data.users.length + 1,
          name: newName
        })
        i.data.newUserName = ''
        changeData(i)
      }
    }
  })
}

const r_title = i => ({
  node: 'p',
  content: i.data.text,
  events: [
    {
      type: $click,
      cb: () => {
        i.data.text = 'Hello SJS!'
        changeData(i)
      }
    }
  ]
})

const r_addUser = i => ({
  node: 'button',
  content: 'Add user',
  events: [m_createUser(i)]
})

const r_userInputShow = i => ({
  node: 'span',
  styles: {
    marginLeft: '20px'
  },
  content: `Type: ${i.data.newUserName}`
})

const r_userInput = i => ({
  node: 'input',
  styles: {
    marginRight: '5px'
  },
  value: i.data.newUserName,
  events: [
    {
      type: $input,
      cb: e => {
        i.data.newUserName = e.target.value
        changeData(i)
      }
    }
  ]
})

const r_userList = i => ({
  node: 'div',
  // inlineStyles
  // styles: {
  //   marginTop: '10px',
  //   padding: '20px',
  //   border: '1px solid black',
  //   width: '300px',
  // },
  classes: ['userList'],
  content: [
    ...renderList({
      i,
      list: 'users',
      component: User,
      props: ['id', 'name'],
      events: [m_updateName]
    })
  ]
})

const render = i => ({
  node: 'div',
  content: [
    r_title(i),
    r_userInput(i),
    r_addUser(i),
    r_userInputShow(i),
    r_userList(i)
  ]
})

const data = {
  text: 'Hello world!',
  users: [
    {
      id: 1,
      name: 'Ray'
    },
    {
      id: 2,
      name: 'Sam'
    }
  ],
  newUserName: ''
}

const css = {
  userList: {
    'margin-top': '10px',
    'padding': '20px',
    'border': '1px solid black',
    'width': '300px'
  }
}

export default {
  data,
  css,
  render
}
