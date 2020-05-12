import el_inputUserName from './el_input-user-name'
import el_inputUserPassword from './el_input-user-password'

const styles = {
  top: '60px'
};

const childList = [
  {
    content: 'Name:',
    node: 'label',
    styles: {
      marginBottom: '5px'
    },
  },
  el_inputUserName,
  el_inputUserPassword,
];

export default {
  node: 'form',
  styles,
  childList
}