

const layout = {
  id: '',
  node: 'span',
  content: 'Click or hover me',
};

const styles = {
  userSelect: 'none',
  fontSize: '2rem',
  cursor: 'pointer',
};

const methods = {
  click: e => {
    let node = e.target;
    node.innerHTML = 'Magic JS!';
  },
  mouseover: e => {
    e.target.style.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
  }
};

const config = {
  ...layout,
  styles,
  methods
};

export default