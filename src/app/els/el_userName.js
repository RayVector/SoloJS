const inputUserName = {
  bind: 'userNameResult',
  node: 'input',
  styles: {
    marginLeft: '10px'
  },
  methods: {
    input: (e, bindEl) => bindEl.innerHTML = e.target.value
  }
};

const inputUserPassword = {
  node: 'input',
  styles: {
    marginLeft: '10px'
  },
  props: {
    type: 'password',
    required: true
  }
};

export default {
  node: 'form',
  childList: [
    {
      content: 'Name:',
      node: 'label',
      styles: {
        marginBottom: '5px'
      },
      childList: [
        inputUserName,
      ]
    },
    inputUserPassword
  ]
}