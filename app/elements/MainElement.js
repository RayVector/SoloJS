import Sjs_el from '../../sjs/element/Sjs_el'
import ThirdElement from './MainElement/ThirdElement'

class MainElement extends Sjs_el {
  constructor() {
    super()
  }

  data = {
    text: 'User list:',
    color: 'green',
    font: '35px',
    list: [
      {
        name: 'Nick',
        age: 24,
      },
      {
        name: 'Rachel',
        age: 20,
      },
    ],
  }

  styles = {
    color: () => this.data.color,
    fontSize: () => this.data.font,
    display: 'flex',
    flexDirection: 'column',
  }

  template = {
    id: 'MainApp',
    node: 'div',
    content: () => this.data.text,
  }

  childList = [
    () => this.data.list.map((el, elIndex) => {
      return {
        component: new ThirdElement().create(),
        props: {
          name: () => el.name,
          age: () => el.age,
        },
        emitEvents: {
          newEmit: (emitData) => {
            const newList = this.data.list
            newList[elIndex].name = 'Pavel'
            newList[elIndex].age = 55
            this.changeData({
              list: newList,
            })
          },
        },
      }
    }),
    {
      component: new ThirdElement().create(),
      props: {
        name: () => 'TestName',
        age: () => 88,
      },
    },
  ]
}

export default MainElement