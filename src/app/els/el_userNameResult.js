const styles = {
  marginLeft: '10px',
  fontSize: '15px',
  color: 'gray'
};


export default {
  id: 'userName',
  content: 'User Name:',
  node: 'div',
  childList: [
    {
      id: 'userNameResult',
      node: 'span',
      styles,
      content: 'Type user name in the field',
      childList: [
        {
          id: 'userNameResultLabel',
          node: 'span',
          content: 'hello'
        }
      ]
    }
  ]
}