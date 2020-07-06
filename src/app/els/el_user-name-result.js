const styles = {
  marginLeft: '10px',
  fontSize: '15px',
  color: 'gray',
  top: '100px'
};


export default {
  id: 'userName',
  content: 'User Name:',
  styles: {
    top: '50px'
  },
  node: 'div',
  childList: [
    {
      id: 'userNameResult',
      node: 'span',
      styles,
      content: 'Type user name in the field',
    }
  ]
}