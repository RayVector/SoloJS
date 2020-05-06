const inputStyles = {
  marginLeft: '10px'
};

const labelStyles = {
  marginBottom: '5px'
};


const inputUserName = {
  bind: 'userNameResult',
  node: 'input',
  styles: inputStyles,
  methods: {
    input: (e, bindEl) => bindEl.innerHTML = e.target.value
  }
};

const inputUserPassword = {
  node: 'input',
  styles: inputStyles,
  methods: {
    input: (e) => console.log(e.target.value)
  }
};


export default {
  childList: [
    {
      content: 'Name:',
      styles: labelStyles,
      childList: [
        inputUserName
      ]
    },
    {
      content: 'Password:',
      styles: labelStyles,
      childList: [
        inputUserPassword
      ]
    }
  ]
}