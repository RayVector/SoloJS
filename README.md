

<p align="center"><img width="200" src="https://github.com/RayVector/SoloJS/blob/master/SoloJS Logo.png"></p>

# SJS (under development)

SJS (SoloJS) - JavaScript modular UI-framework, who takes care of all the work with HTML, CSS and JS in one code flow. 
You just write only JS code, which will be HTML, CSS, JS. Inside the framework also exist UI components.
___

<a href="https://github.com/users/RayVector/projects/1?add_cards_query=is%3Aopen">Project Plan</a>

___

## Code:

1) Component state:
```javascript
data = {
    text: 'Hello world!',
    newText: 'I am solo js!',
    color: 'green',
    font: '35px',
  }
```

2) Template engine:
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


3) Component methods:
```javascript
methods = {
    changeText: () => {
      this.changeData({ // dynamic method for changing state
        text: this.newText,
      })
    },
  }
```

3) Component styles:
```javascript
styles = {
    color: () => this.color, // dynamically binding styles to state
    fontSize: () => this.font, // too ^
    display: 'flex',
    flexDirection: 'column',
  }
```

4) component children:
```javascript
childList = [
    ThirdApp,
  ]

```

5) SJS Component total view:

```javascript
import Sjs_el from '../../sjs/element/Sjs_el'
import ThirdApp from './MainElement/ThirdElement'

class MainElement extends Sjs_el {
  constructor() {
    super()
  }

  data = {
    text: 'Hello world!',
    newText: 'I am solo js!',
    color: 'green',
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
      },
    ],
  }

  childList = [
    ThirdApp,
  ]

  methods = {
    changeText: () => {
      this.changeData({
        text: this.newText,
      })
    },
  }

}

export default new MainElement().create()
```
