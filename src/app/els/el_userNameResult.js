const styles = {
  marginLeft: '10px',
  fontSize: '15px',
  color: 'gray'
};


export default {
  content: 'User Name:',
  childList: [
    {
      id: 'userNameResult',
      node: 'span',
      styles,
      content: 'Type user name in the field',
    }
  ]
}