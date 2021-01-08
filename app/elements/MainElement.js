import Sjs_el from '../../sjs/element/Sjs_el'
import ThirdElement from './MainElement/ThirdElement'
import SecondElement from './SecondElement'

class MainElement extends Sjs_el {
  constructor() {
    super()
  }

  data = {
    text: 'User list:',
    color: 'green',
    font: '35px',
    text2: 'Hello world!',
    list: [
      {
        id: 1,
        name: 'Nick',
        age: 24,
      },
      {
        id: 2,
        name: 'Rachel',
        age: 20,
      },
    ],
  }

  styles = {
    color: () => this.data.color,
    fontSize: () => this.data.font,
  }

  template = {
    id: 'MainApp',
    node: 'div',
    content: () => `${this.getReversedText()}`,
  }

  getReversedText() {
    return this.data.text.split('').reverse().join('')
  }

  childList = [
    () => this.data.list.map((el, elIndex) => {
      return {
        component: ThirdElement,
        props: {
          name: () => el.name,
          age: () => el.age,
          id: () => el.id,
        },
        emitEvents: {
          newEmit: () => {
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
      template: {
        node: 'p',
        content: 'Hey from free node!',
      },
    },
  ]

}

export default MainElement