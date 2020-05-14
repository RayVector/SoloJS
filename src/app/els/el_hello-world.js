const styles = {
  userSelect: 'none',
  fontSize: '2rem',
  cursor: 'pointer'
};

const methods = {
  click: (e) => {
    let node = e.target;
    node.innerHTML = 'Magic JS!';
    console.log(node.$sjs)
  },
  mouseover: (e) => {
    e.target.style.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  }
};

export default {
  id: '',
  node: 'span',
  content: 'Click or hover me',
  styles,
  methods
};