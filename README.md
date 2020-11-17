

<p align="center"><img width="200" src="https://github.com/RayVector/SoloJS/blob/master/SoloJS Logo.png"></p>

# SJS (under development)

SJS (SoloJS) - JavaScript modular UI-framework, who takes care of all the work with HTML, CSS and JS in one code flow. 
You just write only JS code, which will be HTML, CSS, JS. Inside the framework also exist UI components.

Simply put - JS framework to build UI, where you just a describe you component  on JavaScript language.
___

<a href="https://github.com/users/RayVector/projects/1?add_cards_query=is%3Aopen">Project Plan</a>

___

# General overview, parts of component:

(MainElement.js)

___

## State:
```javascript
  data = {
    text: 'Click me',
    newText: 'Hey, I am SJS!',
    color: 'green',
    childProp: 'Child prop!', // state field for prop to child
    font: '35px',
  }
```

___

## Template engine:
```javascript
  template = {
    id: 'MainApp',
    node: 'div',
    content: () => this.text, // dynamic binding to state
    events: [
      {
        type: 'click', // HTML DOM Event
        name: 'changeText', // which method to use? State his name
        isSelf: true, // do event just for this node
      },
    ],
  }
```

___

## Methods:
```javascript
  methods = {
    changeText: () => { 
      this.changeData({ // dynamic method for changing state
        text: this.newText,
        childProp: 'Hello world', // update component state + child prop
      })
    },
  }
```

___

## Styles:
```javascript
  styles = {
    color: () => this.color, // dynamically binding styles to state
    fontSize: () => this.font, // too ^
    display: 'flex',
    flexDirection: 'column',
  }
```

___

## Children:
```javascript
  childList = [
    {
      component: ThirdApp,
      props: { // props to ThirdApp component
        msg: () => this.childProp,
      },
      emitEvents: { // emit events from ThirdApp component
        newEmit: (e) => {
          this.changeData({
            text: e,
          })
        },
      },
    },
  ]
// or simple way:
  childList = [
    ThirdApp,
  ]
```

___

## Lifecycle:
```javascript
  created() {
    console.log('created!')
  }

  mounted() {
    console.log('mounted!')
  }
```
___

## Total view:

```javascript
import Sjs_el from '../../sjs/element/Sjs_el'
import ThirdApp from './MainElement/ThirdElement'

class MainElement extends Sjs_el {
  constructor() {
    super()
  }

  data = {
    text: 'Change text and pass prop',
    newText: 'Hey, I am SJS!',
    color: 'green',
    childProp: 'It is prop text!',
    font: '35px',
  }

  styles = {
    color: () => this.color,
    fontSize: () => this.font,
    display: 'flex',
    flexDirection: 'column',
  }

  template = {
    id: 'MainApp',
    node: 'div',
    content: () => this.text,
    events: [
      {
        type: 'click',
        name: 'changeText',
        isSelf: true,
      },
    ],
  }

  childList = [
    {
      component: ThirdApp,
      props: {
        msg: () => this.childProp,
      },
      emitEvents: {
        newEmit: e => {
          this.changeData({
            text: e,
          })
        },
      },
    },
  ]

  methods = {
    changeText: () => {
      this.changeData({
        text: this.newText,
        childProp: 'Hello world.',
      })
    },
  }

  created() {
    console.log('created!')
  }

  mounted() {
    console.log('mounted!')
  }

}

export default new MainElement().create()
```

___

## Init App:

(main.js)

```javascript
import Sjs from '../sjs/Sjs'
import MainElement from './elements/MainElement'
import SecondElement from './elements/SecondElement'

new Sjs().init('app', [MainElement, SecondElement]) // array of neighbors, you can pass one element or array of elements
```
___



# Detailed overview:
___

## Emits:

(ThirdElement.js) - child of MainElement.js

```javascript
  methods = {
    doEmit: () => {
       this.emit(emitName, emitData) // emit method to parent, emitName should be like emit event in parent
    },
  }
```

___


## Handle Emits:

(MainElement.js)

```javascript
  childList = [
    {
      component: ThirdApp,
      props: {
        msg: () => this.childProp,
      },
      emitEvents: {
        newEmit: e => {
          this.changeData({ // update state from child by emit event
            text: e,
          })
        },
      },
    },
  ]
```

___


## Emit Data as Prop:

```
  methods = {
    doEmit: () => {
      this.emit('newEmit', `${this.emitMsg} ${this.props.msg}`)
    },
  }
```
